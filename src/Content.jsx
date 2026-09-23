import React from 'react';
import projectsData from './data/projectsData.json'; 

// 1. КОМПОНЕНТ: Динамический список всех дизайнов
function DesignsList({ onSelect }) {
  // Безопасно достаем массив проектов
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      <h2>Мои проекты и дизайны</h2>
      <p>Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {list.map((item, index) => {
          // СТРАХОВКА: Если админка завернула данные глубоко, извлекаем их. Иначе берем сам item.
          const data = item.fields ? item.fields : item;
          
          // Безопасно вытаскиваем цвет. Если цвета нет или это пустой массив, ставим дефолтный дзен-зеленый
          const buttonColor = (data.colors && data.colors[0]) ? data.colors[0] : '#4E6E58';
          // Вытаскиваем заголовок. Если пусто — выводим временную заглушку, чтобы кнопка не была пустой
          const buttonTitle = data.title || `Проект #${index + 1}`;
          // Вытаскиваем ID для клика
          const projectId = data.id || `project-${index}`;

          return (
            <div 
              key={projectId}
              className="proto-block"
              style={{ 
                backgroundColor: buttonColor, // Принудительно красим кнопку
                padding: '25px', 
                borderRadius: '8px', 
                color: '#fff', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                display: 'block' // Задаем блочную видимость
              }}
              onClick={() => onSelect(projectId)} // Клик открывает кейс
            >
              {/* Выводим заголовок проекта на кнопку */}
              <span>{buttonTitle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. КОМПОНЕНТ: Объяснение конкретного выбранного дизайна
function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  // Ищем в базе проект, чей ID совпадает с выбранным на кнопке (с учетом страховки полей)
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  if (!currentItem) return <div>Проект не найден</div>;
  
  // Распаковываем данные найденного проекта
  const current = currentItem.fields ? currentItem.fields : currentItem;

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
        <h2>{current.title || 'Без названия'}</h2>
        <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '20px' }}>{current.subtitle || ''}</p>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{current.description || ''}</p>
        
        <div className="info-block" style={{ marginBottom: '20px' }}>
          <h3>ЗАДАЧА</h3>
          <p style={{ lineHeight: '1.6' }}>{current.task || 'Описание задачи отсутствует.'}</p>
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

// 3. КОРНЕВОЙ МЕНЕДЖЕР ЛЕВОЙ ПАНЕЛИ (остается без изменений)
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