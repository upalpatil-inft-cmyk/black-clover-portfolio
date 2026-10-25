import React from 'react';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Clover } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Attributes', href: '#attributes' },
  { label: 'Missions', href: '#missions' },
  { label: 'Achievements', href: '#contribute' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme, onCommandOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Upal Patil home" onClick={closeMenu}>
        <span className="brand-mark"><Clover size={20} strokeWidth={1.8} /></span>
        <span className="brand-copy"><strong>UPAL<span>.</span></strong><small>GRIMOIRE / 01</small></span>
      </a>

      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(link => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
        <a className="nav-mobile-cta" href="#contribute" onClick={closeMenu}>View achievements <span>↗</span></a>
      </nav>

      <div className="nav-actions">
        <button className="command-trigger" type="button" onClick={onCommandOpen} aria-label="Open spellbook command menu">
          <span>COMMANDS</span><kbd>⌘K</kbd>
        </button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
        <a className="nav-cta" href="#contribute">View achievements <span>↗</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
