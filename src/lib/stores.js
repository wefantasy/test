import { writable, derived, get } from 'svelte/store';
import Fuse from 'fuse.js';
import sitesData from './data/sites.json';

// Theme store
export const theme = writable('light');

// Search query store (internal)
const _searchQuery = writable('');

// Mobile menu open state
export const mobileMenuOpen = writable(false);

// Mobile search open state
export const mobileSearchOpen = writable(false);

// Extract all non-folder sites recursively
function extractAllSites(items, parentPath = '') {
  let sites = [];
  for (const item of items) {
    if (item.type === 'folder' && item.children) {
      sites = sites.concat(extractAllSites(item.children, parentPath ? `${parentPath}/${item.title}` : item.title));
    } else if (!item.type || item.type !== 'folder') {
      sites.push({ ...item, path: parentPath });
    }
  }
  return sites;
}

// All sites extracted
export const allSites = extractAllSites(sitesData);

// Navigation data with "All Sites" prepended
export const navData = [
  { title: 'allSites', type: 'virtual', isAllSites: true },
  ...sitesData
];

// Current selected path (internal)
const _selectedPath = writable(['allSites']);

// Flag to prevent circular updates
let isUpdating = false;

// Exposed searchQuery with side effect
export const searchQuery = {
  subscribe: _searchQuery.subscribe,
  set: (value) => {
    if (isUpdating) return;
    isUpdating = true;
    _searchQuery.set(value);
    // When search content changes, set selected path to "All Sites"
    if (value && value.trim()) {
      _selectedPath.set(['allSites']);
    }
    isUpdating = false;
  },
  update: (fn) => {
    if (isUpdating) return;
    isUpdating = true;
    _searchQuery.update((current) => {
      const newValue = fn(current);
      // When search content changes, set selected path to "All Sites"
      if (newValue && newValue.trim()) {
        _selectedPath.set(['allSites']);
      }
      return newValue;
    });
    isUpdating = false;
  }
};

// Exposed selectedPath with side effect
export const selectedPath = {
  subscribe: _selectedPath.subscribe,
  set: (value) => {
    if (isUpdating) return;
    isUpdating = true;
    _selectedPath.set(value);
    // When directory changes, clear search content
    _searchQuery.set('');
    isUpdating = false;
  },
  update: (fn) => {
    if (isUpdating) return;
    isUpdating = true;
    _selectedPath.update((current) => {
      const newValue = fn(current);
      // When directory changes, clear search content
      _searchQuery.set('');
      return newValue;
    });
    isUpdating = false;
  }
};

// Get current folder content based on selected path
export const currentContent = derived(_selectedPath, ($selectedPath) => {
  if ($selectedPath[0] === 'allSites') {
    return { sites: allSites, folders: [] };
  }

  let current = sitesData;
  for (const segment of $selectedPath) {
    const found = current.find(item => item.title === segment);
    if (found && found.type === 'folder' && found.children) {
      current = found.children;
    } else {
      break;
    }
  }

  const folders = current.filter(item => item.type === 'folder');
  const sites = current.filter(item => !item.type || item.type !== 'folder');

  return { sites, folders };
});

// Fuse.js instance for search
const fuseOptions = {
  keys: ['title', 'description', 'tags'],
  includeMatches: true,
  threshold: 0.4,
  ignoreLocation: true,
};

const fuse = new Fuse(allSites, fuseOptions);

// Search results
export const searchResults = derived(_searchQuery, ($searchQuery) => {
  if (!$searchQuery.trim()) {
    return null;
  }
  return fuse.search($searchQuery);
});

// Initialize theme from localStorage
export function initTheme() {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'light';
    theme.set(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

// Toggle theme
export function toggleTheme() {
  theme.update(t => {
    const newTheme = t === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    return newTheme;
  });
}
