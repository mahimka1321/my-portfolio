import React from 'react';

function Header({ currentPage, onLogoClick, onTabChange }) {
  return (
    <header className="site-header">
      <div className="logo" onClick={onLogoClick}>
        MAHOMKA1231
      </div>
      
      <nav className="navigation">
        <button 
          className={currentPage === 'designs' ? 'active' : ''} 
          onClick={() => onTabChange('designs')}
        >
          デザイン
        </button>
        <button 
          className={currentPage === 'skills' ? 'active' : ''} 
          onClick={() => onTabChange('skills')}
        >
          スキル
        </button>
      </nav>
    </header>
  );
}

export default Header;
