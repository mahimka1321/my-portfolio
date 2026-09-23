import React, { useEffect } from 'react';
import projectsData from './data/projectsData.json'; 
import './Content.scss'; 

// 1. КОМПОНЕНТ: Динамический список проектов (кнопки)
function DesignsList({ onSelect }) {
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      <h2 className="section-title">Мои проекты и дизайны</h2>
      <p className="section-subtitle">Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid">
        {list.map((item, index) => {
          const data = item.fields ? item.fields : item;
          
          let firstColor = '#4E6E58';
          if (data.colors && Array.isArray(data.colors) && data.colors.length > 0) {
            const firstObj = data.colors[0];
            firstColor = firstObj.colorCode ? firstObj.colorCode : firstObj;
          }

          const titleText = data.title && data.title !== '-' ? `Проект: ${data.title}` : `Проект #${index + 1}`;
          const projectId = data.id || `project-${index}`;

          return (
            <div 
              key={projectId}
              className="proto-block"
              style={{ backgroundColor: firstColor }} // Динамический цвет оставляем инлайном
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

// 2. КОМПОНЕНТ: ЖУРНАЛЬНЫЙ UI/UX КЕЙС
function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  if (!currentItem) return <div style={{ padding: '30px' }}>Проект не найден</div>;
  const current = currentItem.fields ? currentItem.fields : currentItem;

  // 🔥 ОЧИЩАЕМ СТРОКУ ОТ ПРОБЕЛОВ: .trim() убирает случайные пробелы по бокам названия
  const cleanFont = current.fonts && current.fonts !== '-' ? current.fonts.trim() : 'Nunito';

  return (
    <div 
      className="design-detail-page" 
      style={{ 
        // Передаем одну чистую переменную для всей страницы
        '--chosen-font': cleanFont
      }}
    >
      
      <button className="back-btn" onClick={onBack}>
        ← К ВСЕМ ДИЗАЙНАМ
      </button>
      
      {/* ВЕРХНЯЯ ШАПКА КЕЙСА */}
      <div className="case-header-block">
        <span className="ui-ux-tag">UI / UX ДИЗАЙН</span>
        <h1>{current.title || 'Без названия'}</h1>
        
        <div className="subtitle-wrap">
          <p className="case-subtitle">{current.subtitle || ''}</p>
          <span className="decor-ray left">⚡</span>
          <span className="decor-ray right">⚡</span>
        </div>

        {current.topQuote && (
          <div className="top-handwritten-quote">
            {current.topQuote} ⭐️
          </div>
        )}
      </div>

      {/* СРЕДНИЙ БЛОК: ОПИСАНИЕ, ТЕГИ И ТАЙМЛАЙН */}
      <div className="case-middle-section">
        <div>
          <p className="desc-text">{current.description || ''}</p>
          
          <div className="tags-container">
            {current.tags && Array.isArray(current.tags) ? (
              current.tags.map((t, i) => {
                const tagText = t.tag ? t.tag : t;
                return <span key={i} className="tag-item">{tagText}</span>;
              })
            ) : (
              <>
                <span className="tag-item">UI/UX</span>
                <span className="tag-item">WEB</span>
              </>
            )}
          </div>
        </div>

        <div className="action-column">
          <div className="btn-about">
            <span>☕️ О ПРОЕКТЕ</span>
            <span>➔</span>
          </div>

          <div className="timeline-steps">
            <div className="step"><div className="dot active"></div>КОНЦЕПТ</div>
            <div className="step"><div className="dot"></div>UI КИТ</div>
            <div className="step"><div className="dot"></div>ДИЗАЙН</div>
            <div className="step"><div className="dot"></div>АДАПТИВ</div>
          </div>
        </div>
      </div>

      {/* НИЖНИЙ ТРЕХКОЛОНОЧНЫЙ БЛОК */}
      <div className="case-bottom-grid">
        
        {/* Колонка 1: ЗАДАЧА */}
        <div className="info-column">
          <h4>ЗАДАЧА</h4>
          <p>{current.task || 'Описание задачи отсутствует.'}</p>
          {current.leftQuote && (
            <p className="quote-style">
              ✨ {current.leftQuote} ♡
            </p>
          )}
        </div>

        {/* Колонка 2: РЕЗУЛЬТАТ */}
        <div className="info-column">
          <h4>РЕЗУЛЬТАТ</h4>
          <div>
            {current.results && Array.isArray(current.results) ? (
              current.results.map((resObj, i) => {
                const txt = resObj.result ? resObj.result : resObj;
                const icon = i % 2 === 0 ? '💻' : '📱';
                return (
                  <div key={i} className="result-item">
                    <span className="icon">{icon}</span>
                    <span className="text">{txt}</span>
                  </div>
                );
              })
            ) : (
              <p>Результаты обрабатываются.</p>
            )}
          </div>
        </div>

        {/* Колонка 3: ЦВЕТА И ШРИФТЫ */}
        <div className="info-column">
          <h4>ЦВЕТА</h4>
          <div className="colors-row">
            {current.colors && Array.isArray(current.colors) ? (
              current.colors.map((cObj, i) => {
                const hex = cObj.colorCode ? cObj.colorCode : cObj;
                return (
                  <div 
                    key={i} 
                    title={hex}
                    className="color-circle"
                    style={{ backgroundColor: hex }}
                  />
                );
              })
            ) : (
              <div className="color-circle" style={{ backgroundColor: '#4E6E58' }} />
            )}
          </div>

          <h4>ШРИФТЫ</h4>
          <h3 className="font-primary">
            {cleanFont}
          </h3>
          <p className="font-secondary">
            {cleanFont} (Italic)
          </p>

          {current.rightQuote && (
            <p className="quote-style right-align">
              {current.rightQuote} ♡
            </p>
          )}
        </div>

      </div>
    </div>
  );
}


// 3. КОРНЕВОЙ МЕНЕДЖЕР ЛЕВОЙ ПАНЕЛИ (СОХРАНЯЕТ СОСТОЯНИЕ ПРИ F5)
function Content({ page, setPage, selectedDesign, setSelectedDesign, setCurrentPreview }) {
  
  // 🔥 ЭФФЕКТ: Синхронизируем состояние с localStorage при любых изменениях
  useEffect(() => {
    localStorage.setItem('portfolio_page', page);
  }, [page]);

  useEffect(() => {
    if (selectedDesign) {
      localStorage.setItem('portfolio_design', selectedDesign);
    } else {
      localStorage.removeItem('portfolio_design');
    }
  }, [selectedDesign]);

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
        <div className="home-page" style={{ padding: '30px' }}>
          <h1>ПРОЕКТИРУЮ СИСТЕМЫ. УПРАВЛЯЮ ХАОСОМ.</h1>
        </div>
      );
    case 'designs':
      return selectedDesign === null ? (
        <DesignsList onSelect={handleSelectDesign} />
      ) : (
        <DesignDetail id={selectedDesign} onBack={handleBackToList} />
      );
    case 'skills':
      return <div className="skills-page" style={{ padding: '30px' }}><h2>Мои навыки</h2></div>;
    default:
      return <div style={{ padding: '30px' }}>Страница не найдена</div>;
  }
}

export default Content;
