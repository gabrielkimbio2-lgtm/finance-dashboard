
// src/components/Header.jsx
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

// Simple Inline SVG for the Moon Icon
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" 
  width="20" height="20" 
  viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

// Simple Inline SVG for the Sun Icon
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);


const Header = () => {
  // Grab our state and functions from the context instead of zustand
  const { role, theme, setRole, toggleTheme } = useContext(AppContext);

  return (
    <header className="header">
      <h2>Finance Dashboard</h2>
      
      <div className="header-actions">
        {/* Role Switcher dropdown */}
        <div>
          <label style={{ marginRight: '8px', fontSize: '14px' }}>Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="VIEWER">Viewer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Theme Toggle Button */}
       <button onClick={toggleTheme} className="theme-btn" title="Toggle Theme">
       {theme === 'light' ? <MoonIcon/> : <SunIcon/>}
     </button>
      </div>
    </header>
  );
};

export default Header
