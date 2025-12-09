import { writable, derived } from 'svelte/store';

export const locale = writable('zh');

const translations = {
  zh: {
    allSites: '全部站点',
    search: '搜索网站...',
    searchPlaceholder: '搜索标题或描述...',
    noResults: '没有找到匹配的网站',
    copyright: '© 2024 Collector. All rights reserved.',
    lightTheme: '浅色',
    darkTheme: '深色',
    toggleTheme: '切换主题',
    toggleLanguage: '切换语言',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    folder: '文件夹',
    website: '网站',
    visitSite: '访问网站',
  },
  en: {
    allSites: 'All Sites',
    search: 'Search websites...',
    searchPlaceholder: 'Search title or description...',
    noResults: 'No matching websites found',
    copyright: '© 2024 Collector. All rights reserved.',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'Toggle Language',
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu',
    folder: 'Folder',
    website: 'Website',
    visitSite: 'Visit Site',
  }
};

export const t = derived(locale, ($locale) => {
  return (key) => translations[$locale]?.[key] || translations.en[key] || key;
});
