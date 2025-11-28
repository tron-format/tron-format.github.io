import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img 
              src={theme === 'dark' ? '/logo/dark.svg' : '/logo/light.svg'} 
              alt="TRON Format Logo" 
              className="logo-image"
            />
            TRON Format
          </Link>
          
          <div className="desktop-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Spec</NavLink>
            <NavLink to="/playground" className={({ isActive }) => isActive ? 'active' : ''}>Playground</NavLink>
            <NavLink to="/sdks" className={({ isActive }) => isActive ? 'active' : ''}>SDKs</NavLink>
            {/* <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink> */}
          </div>
        </div>

        <div className="nav-right">
          <a 
            href="https://github.com/tron-format/tron-format.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            aria-label="GitHub repository"
          >
            <img 
              src="https://github.com/fluidicon.png" 
              alt="GitHub" 
              width={22} 
              height={22}
              style={{ borderRadius: '50%' }}
            />
          </a>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle desktop-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="mobile-controls">
            <button 
                onClick={toggleTheme} 
                className="theme-toggle mobile-theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="hamburger" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" end onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Spec</NavLink>
          <NavLink to="/playground" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Playground</NavLink>
          <NavLink to="/sdks" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>SDKs</NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
        </div>
      )}
    </nav>
  );
};
