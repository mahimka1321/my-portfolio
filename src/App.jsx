import React, { useState, useEffect } from 'react';
// Импортируй свои компоненты Header, Content, ContentPreview как обычно

function App() {
  // 1. ИНИЦИАЛИЗАЦИЯ СТЕЙТОВ ИЗ ХЭША АДРЕСНОЙ СТРОКИ
  const [page, setPage] = useState('home');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [currentPreview, setCurrentPreview] = useState('map');

  // 2. ФУНКЦИЯ: Разбор ссылки при загрузке или её изменении
  const parseLocationHash = () => {
    const hash = window.location.hash; // Получаем всё, что идет после # (например, #/design/tour-box)
    
    if (!hash || hash === '#/' || hash === '#/home') {
      setPage('home');
      setSelectedDesign(null);
      setCurrentPreview('map');
    } else if (hash.startsWith('#/design/')) {
      // Если ссылка на конкретный дизайн
      const designId = hash.replace('#/design/', '');
      setPage('designs');
      setSelectedDesign(designId);
      setCurrentPreview(`preview-${designId}`);
    } else {
      // Если ссылка на вкладку (например, #/designs или #/skills)
      const cleanPage = hash.replace('#/', '');
      setPage(cleanPage);
      setSelectedDesign(null);
      setCurrentPreview('map');
    }
  };

  // 3. ЭФФЕКТ: Вешаем слушатель на изменение URL браузера
  useEffect(() => {
    // Разбираем хэш при самом первом открытии сайта
    parseLocationHash();

    // Слушаем, если пользователь нажал стрелочки "Назад/Вперед" в браузере
    const handleHashChange = () => parseLocationHash();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 4. ФУНКЦИИ КЛИКОВ: Теперь они просто меняют ХЭШ в строке браузера, а React сам подстроится!
  const handleLogoClick = () => {
    window.location.hash = '#/home';
  };

  const handleTabChange = (newPage) => {
    window.location.hash = `#/${newPage}`;
  };

  return (
    <div className="app-container">
      <Header 
        page={page} 
        handleTabChange={handleTabChange} 
        handleLogoClick={handleLogoClick} 
      />
      <div className="main-layout" style={{ display: 'flex' }}>
        <Content 
          page={page} 
          setPage={setPage}
          selectedDesign={selectedDesign} 
          setSelectedDesign={setSelectedDesign} 
          setCurrentPreview={setCurrentPreview} 
        />
        <ContentPreview preview={currentPreview} />
      </div>
    </div>
  );
}

export default App;
