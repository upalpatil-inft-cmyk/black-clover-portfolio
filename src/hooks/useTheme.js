import { useEffect, useState } from 'react';

const STORAGE_KEY = 'upal-grimoire-theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* Storage can be unavailable in private browsing. */ }
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0e0c' : '#e7d6c2');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Theme still works for this session. */ }
  }, [theme]);

  return { theme, toggleTheme: () => setTheme(current => current === 'dark' ? 'light' : 'dark') };
}
