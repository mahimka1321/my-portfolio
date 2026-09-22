import './styles.scss';
// src/App.jsx
import React, { useState } from 'react';

import Header from './Header';
import Content from './Content';
import ContentPreview from './ContentPreview';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Вкладки: home, designs, skills
  const [selectedDesign, setSelectedDesign] = useState(null); // Текущий кейс: null, tea, hankoya
  const [currentPreview, setCurrentPreview] = useState('map'); // Превью: map, preview-tea

  const handleLogoClick = () => {
    setCurrentPage('home');
    setSelectedDesign(null);
    setCurrentPreview('map');
  };

  const handleTabChange = (page) => {
    setCurrentPage(page);
    setSelectedDesign(null);
    setCurrentPreview('map'); // При смене таба всегда сбрасываем на общую карту
  };

  return (
    <div className="app-container">
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
      <ContentPreview preview={currentPreview} />
    </div>
  );
}
export default App;
