import './styles.scss';
// src/App.jsx
import React, { useState } from 'react';

import Header from './Header';
import Content from './Content';
import ContentPreview from './ContentPreview';

function App() {
// --- 1. ИНИЦИАЛИЗАЦИЯ СТЕЙТОВ С УМНЫМ ЧТЕНИЕМ ПАМЯТИ БРАУЗЕРА ---
const [page, setPage] = useState(() => localStorage.getItem('portfolio_page') || 'home');
const [selectedDesign, setSelectedDesign] = useState(() => localStorage.getItem('portfolio_design') || null);

// Превью для правой панели (тоже сразу вспоминает, где мы были)
const [currentPreview, setCurrentPreview] = useState(() => {
  const savedDesign = localStorage.getItem('portfolio_design');
  return savedDesign ? `preview-${savedDesign}` : 'map';
});

// --- 2. ИСПРАВЛЕННЫЕ ФУНКЦИИ КЛИКОВ (РАБОТАЮТ С ЕДИНЫМ СТЕЙТОМ) ---
const handleLogoClick = () => {
  setPage('home'); // Используем setPage вместо setCurrentPage
  setSelectedDesign(null);
  setCurrentPreview('map');
};

const handleTabChange = (newPage) => {
  setPage(newPage); // Переключаем вкладку в едином стейте
  setSelectedDesign(null);
  setCurrentPreview('map'); // При смене таба всегда сбрасываем на общую карту разума
};


  return (
    <div className="app-container">
      <div className="left-side-container">
        <Header 
          currentPage={page} 
          onLogoClick={handleLogoClick} 
          onTabChange={handleTabChange} 
        />
        <Content 
          page={page} 
          selectedDesign={selectedDesign}
          setSelectedDesign={setSelectedDesign}
          setCurrentPreview={setCurrentPreview}
        />
      </div>
      <ContentPreview preview={currentPreview} />
    </div>
  );
}
export default App;
