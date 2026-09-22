import React, { useState } from 'react';
import Header from './Header';
import Content from './Content';
import ContentPreview from './ContentPreview';
import './styles.scss';


function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, designs, skills
  const [currentPreview, setCurrentPreview] = useState('map'); // map, preview-tea, etc.
  const [selectedDesign, setSelectedDesign] = useState(null); // null, tea, hankoya, terraria

  // Полный сброс на Главную (логотип)
  const handleLogoClick = () => {
    setCurrentPage('home');
    setCurrentPreview('map');
    setSelectedDesign(null);
  };

  // Переключение основных вкладок из Шапки
  const handleTabChange = (page) => {
    setCurrentPage(page);
    setSelectedDesign(null);
    setCurrentPreview('map'); // При смене вкладки всегда возвращаем статическую карту
    page={currentPage} 
  };

  return (
  <div className="app-container">
    
    {/* Собираем левую половину в один вертикальный блок */}
    <div className="left-side-container">
      <Header 
        currentPage={currentPage}
        onLogoClick={handleLogoClick}
        onTabChange={handleTabChange}
      />
      <Content 
        page={currentPage} 
        selectedDesign={selectedDesign}
        setSelectedDesign={setSelectedDesign}
        setCurrentPreview={setCurrentPreview} 
      />
    </div>

    {/* Правая половина стоит независимо и идет во всю высоту */}
    <ContentPreview 
      preview={currentPreview} 
    />

  </div>
  );
}

export default App;