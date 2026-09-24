import React, { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import ContentPreview from './ContentPreview';
import './styles.scss'; // Больше никаких лишних импортов лоадера!

function App() {
  // 1. ИНИЦИАЛИЗАЦИЯ СТЕЙТОВ ИЗ ХЭША АДРЕСНОЙ СТРОКИ
  const [page, setPage] = useState('home');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [currentPreview, setCurrentPreview] = useState('map');

  // 2. ФУНКЦИЯ: Разбор ссылки при загрузке или её изменении
  const parseLocationHash = () => {
    const hash = window.location.hash;
    
    if (!hash || hash === '#/' || hash === '#/home') {
      setPage('home');
      setSelectedDesign(null);
      setCurrentPreview('map');
    } else if (hash.startsWith('#/design/')) {
      const designId = hash.replace('#/design/', '');
      setPage('designs');
      setSelectedDesign(designId);
      setCurrentPreview(`preview-${designId}`);
    } else {
      const cleanPage = hash.replace('#/', '');
      setPage(cleanPage);
      setSelectedDesign(null);
      setCurrentPreview('map');
    }
  };

  // 3. ЭФФЕКТ: Вешаем слушатель на изменение URL браузера и гасим глобальный HTML-лоадер
  useEffect(() => {
    parseLocationHash();

    const handleHashChange = () => parseLocationHash();
    window.addEventListener('hashchange', handleHashChange);
    
    // МЯГКО ГАСИМ ГЛОБАЛЬНЫЙ ЛОАДЕР ИЗ ИНДЕКСА
    const hideGlobalLoader = () => {
      const loader = document.getElementById('global-preloader');
      if (loader) {
        loader.classList.add('preloader--hidden'); 
        setTimeout(() => loader.remove(), 400); 
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(hideGlobalLoader, 500); 
    } else {
      window.addEventListener('load', hideGlobalLoader);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('load', hideGlobalLoader);
      };
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 4. ФУНКЦИИ КЛИКОВ
  const handleLogoClick = () => { window.location.hash = '#/home'; };
  const handleTabChange = (newPage) => { window.location.hash = `#/${newPage}`; };

  return (
    <>
      <div className="app-container">
        <div className="left-side-container">
          <Header 
            currentPage={page} 
            onTabChange={handleTabChange} 
            onLogoClick={handleLogoClick} 
          />
          <Content 
            page={page} 
            setPage={setPage}
            selectedDesign={selectedDesign} 
            setSelectedDesign={setSelectedDesign} 
            setCurrentPreview={setCurrentPreview} 
          />
        </div>
        <ContentPreview preview={currentPreview} />
      </div>
    </>
  );
}

export default App;
