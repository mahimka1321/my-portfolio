import React from 'react';
import projectsData from './data/projectsData.json'; 

// 1. КОМПОНЕНТ: Динамический список всех дизайнов
function DesignsList({ onSelect }) {
  // Безопасно достаем массив проектов. Если там пусто, ставим пустой массив [].
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      <h2>Мои проекты и дизайны</h2>
      <p>Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {list.map((item) => (
          <div 
            key={item.id}
            className="proto-block"
            style={{ 
              // Задаем цвет фона кнопки из первого HEX-кода, введенного в админке
              backgroundColor: (item.colors && item.colors[0]) ? item.colors[0] : '#4E6E58', 
              padding: '25px', 
              borderRadius: '8px', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
            onClick={() => onSelect(item.id)} // Клик открывает кейс
          >
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. КОМПОНЕНТ: Объяснение конкретного выбранного дизайна
function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  // Ищем в базе проект, чей ID совпадает с выбранным на кнопке
  const current = list.find(item => item.id === id);

  if (!current) return <div>Проект не найден</div>;

  return (
    <div className="design-detail-page">
      <button 
        className="back-btn" 
        onClick={onBack}
        style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
      >
        ← Назад к проектам
      </button>
      
      <div className="case-study-content">
        <h2>{current.title}</h2>
        <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '20px' }}>{current.subtitle}</p>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{current.description}</p>
        
        <div className="info-block" style={{ marginBottom: '20px' }}>
          <h3>ЗАДАЧА</h3>
          <p style={{ lineHeight: '1.6' }}>{current.task}</p>
        </div>
        
        <div className="info-block">
          <h3>РЕЗУЛЬТАТЫ</h3>
          <div style={{ lineHeight: '1.6' }}>
            {current.results && current.results.map((res, i) => (
              <span key={i}>• {res}<br/></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. КОРНЕВОЙ МЕНЕДЖЕР ЛЕВОЙ ПАНЕЛИ
function Content({ page, selectedDesign, setSelectedDesign, setCurrentPreview }) {
  
  const handleSelectDesign = (id) => {
    setSelectedDesign(id);
    setCurrentPreview(`preview-${id}`); 
  };

  const handleBackToList = () => {
    setSelectedDesign(null);
    setCurrentPreview('map'); 
  };

  switch (page) {
    case 'home':
      return (
        <div className="home-page">
          <h1>ПРОЕКТИРУЮ СИСТЕМЫ. УПРАВЛЯЮ ХАОСОМ.</h1>
          <p>Это главная страница портфолио Максима. Справа отображается статическая карта архитектуры.</p>
        </div>
      );
      
    case 'designs':
      return selectedDesign === null ? (
        <DesignsList onSelect={handleSelectDesign} />
      ) : (
        <DesignDetail id={selectedDesign} onBack={handleBackToList} />
      );

    case 'skills':
      return <div className="skills-page"><h2>Мои навыки и технологии</h2></div>;

    default:
      return <div>Страница не найдена</div>;
  }
}

export default Content;
