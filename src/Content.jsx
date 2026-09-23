import React from 'react';
import projectsData from './data/projectsData.json'; 

// 1. КОМПОНЕНТ: Динамический список всех дизайнов
function DesignsList({ onSelect }) {
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      <h2>Мои проекты и дизайны</h2>
      <p>Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {list.map((item, index) => {
          const data = item.fields ? item.fields : item;
          
          const bgColor = data.buttonColor && data.buttonColor !== '-' ? data.buttonColor : '#4E6E58';
          const titleText = data.title && data.title !== '-' ? `Проект: ${data.title}` : `Проект #${index + 1}`;
          const projectId = data.id || `project-${index}`;

          return (
            <div 
              key={projectId}
              className="proto-block"
              style={{ 
                backgroundColor: bgColor, 
                padding: '25px', 
                borderRadius: '8px', 
                color: '#fff', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                display: 'block'
              }}
              onClick={() => onSelect(projectId)}
            >
              <span>{titleText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. КОМПОНЕНТ: Объяснение конкретного выбранного дизайна (БЕЗ БЕЛОГО ФОНА И С ФИКСОМ РЕЗУЛЬТАТОВ)
function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  if (!currentItem) return <div>Проект не найден</div>;
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
        <span className="ui-ux-tag" style={{ color: '#888', fontSize: '12px', fontWeight: 'bold' }}>UI / UX КЕЙС</span>
        <h1 style={{ marginTop: '5px', textTransform: 'uppercase' }}>{current.title || 'Без названия'}</h1>
        <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '20px', fontSize: '18px' }}>{current.subtitle || ''}</p>
        
        <p style={{ marginBottom: '30px', lineHeight: '1.6', fontSize: '16px' }}>{current.description || ''}</p>
        
        <div className="case-grid" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Блок: ЗАДАЧА */}
          <div className="info-block">
            <h3 style={{ borderLeft: '4px solid #ffd200', paddingLeft: '10px', marginBottom: '10px' }}>ЗАДАЧА</h3>
            <p style={{ lineHeight: '1.6' }}>{current.task || 'Описание задачи отсутствует.'}</p>
          </div>
          
          {/* Блок: РЕЗУЛЬТАТЫ (Распаковываем объекты Sveltia CMS правильно!) */}
          <div className="info-block">
            <h3 style={{ borderLeft: '4px solid #ffd200', paddingLeft: '10px', marginBottom: '10px' }}>РЕЗУЛЬТАТЫ</h3>
            <div style={{ lineHeight: '1.6' }}>
              {current.results && Array.isArray(current.results) ? (
                current.results.map((resObj, i) => {
                  // Вытаскиваем текст из ключа 'result', который генерирует админка
                  const txt = resObj.result ? resObj.result : resObj;
                  return <span key={i}>• {txt}<br/></span>;
                })
              ) : (
                <p>Результаты обрабатываются.</p>
              )}
            </div>
          </div>

          {/* Блок: СПЕЦИФИКАЦИЯ СТИЛЯ (Чистый прозрачный фон, полный минимализм) */}
          <div className="info-block" style={{ marginTop: '10px', padding: '0px' }}>
            <h3 style={{ borderLeft: '4px solid #ffd200', paddingLeft: '10px', marginBottom: '15px' }}>СПЕЦИФИКАЦИЯ СТИЛЯ</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <strong>Фирменный цвет:</strong>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: current.buttonColor || '#4E6E58',
                border: '1px solid #ccc'
              }} />
              <span>{current.buttonColor || '#4E6E58'}</span>
            </div>

            <div>
              <strong>Типографика (Шрифты):</strong>
              <p style={{ marginTop: '5px', fontFamily: 'monospace', fontSize: '15px' }}>{current.fonts || 'Системные шрифты'}</p>
            </div>
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