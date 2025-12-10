import { writable } from 'svelte/store';
import { setLanguageTag, languageTag, onSetLanguageTag, availableLanguageTags } from './paraglide/runtime.js';
import * as m from './paraglide/messages.js';

// Create a reactive store for the current language
const createLocaleStore = () => {
  // Initialize from localStorage if available, otherwise use source language
  const getInitialLocale = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale');
      if (saved && availableLanguageTags.includes(saved)) {
        return saved;
      }
    }
    return languageTag();
  };

  const { subscribe, set } = writable(getInitialLocale());

  // Set up the callback to update the store when language changes
  if (typeof window !== 'undefined') {
    onSetLanguageTag((tag) => {
      set(tag);
      localStorage.setItem('locale', tag);
    });

    // Initialize Paraglide with saved locale
    const initial = getInitialLocale();
    setLanguageTag(initial);
  }

  return {
    subscribe,
    set: (tag) => {
      if (availableLanguageTags.includes(tag)) {
        setLanguageTag(tag);
      }
    },
    toggle: () => {
      const current = languageTag();
      const newLocale = current === 'zh' ? 'en' : 'zh';
      setLanguageTag(newLocale);
    }
  };
};

export const locale = createLocaleStore();

// Re-export messages for convenience
export { m, availableLanguageTags };
