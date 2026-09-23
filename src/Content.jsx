import React from 'react';
import projectsData from './data/projectsData.json'; 

// 1. КОМПОНЕНТ: Динамический список проектов (кнопки)
function DesignsList({ onSelect }) {
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page" style={{ padding: '30px', color: '#2B2B2B' }}>
      <h2 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Мои проекты и дизайны</h2>
      <p style={{ color: '#666', marginBottom: '25px' }}>Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
              style={{ 
                backgroundColor: firstColor, 
                padding: '25px', 
                borderRadius: '12px', 
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

// 2. КОМПОНЕНТ: ЖУРНАЛЬНЫЙ UI/UX КЕЙС (МАКЕТ ИЗ МАКЕТА ХАБА)
function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  if (!currentItem) return <div style={{ padding: '30px' }}>Проект не найден</div>;
  const current = currentItem.fields ? currentItem.fields : currentItem;

  return (
    <div className="design-detail-page" style={{ 
      padding: '40px 30px', 
      color: '#2B2B2B', 
      backgroundColor: '#FAF9F5', // Тот самый благородный молочный фон с макета
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100%'
    }}>
      
      {/* Кнопка возврата в стиле макета */}
      <button 
        className="back-btn" 
        onClick={onBack}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          fontSize: '13px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          fontWeight: 'bold',
          color: '#555',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← К ВСЕМ ДИЗАЙНАМ
      </button>
      
      {/* ГЛАВНЫЙ БЛОК ШАПКИ КЕЙСА */}
      <div style={{ position: 'relative', marginBottom: '35px' }}>
        <span style={{ color: '#888', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          UI / UX ДИЗАЙН
        </span>
        
        <h1 style={{ 
          fontSize: '46px', 
          fontWeight: '900', 
          lineHeight: '1.1', 
          margin: '5px 0 15px 0', 
          textTransform: 'uppercase',
          letterSpacing: '-0.5px'
        }}>
          {current.title || 'Без названия'}
        </h1>
        
        {/* Желтый рукописный подзаголовок */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ 
            fontSize: '22px', 
            fontFamily: '"Georgia", serif', 
            fontStyle: 'italic', 
            color: '#D9A74A', 
            margin: '0',
            position: 'relative',
            zIndex: '2'
          }}>
            {current.subtitle || ''}
          </p>
          <span style={{ position: 'absolute', left: '-25px', top: '5px', color: '#D9A74A', fontSize: '18px' }}>⚡</span>
          <span style={{ position: 'absolute', right: '-25px', top: '5px', color: '#D9A74A', fontSize: '18px' }}>⚡</span>
        </div>

        {/* Справа сверху: Рисованная цитата "Чай - это тоже забота" */}
        {current.topQuote && (
          <div style={{ 
            position: 'absolute', 
            right: '40px', 
            top: '-10px', 
            fontFamily: '"Georgia", serif', 
            fontStyle: 'italic', 
            color: '#D9A74A', 
            textAlign: 'center',
            fontSize: '15px'
          }}>
            {current.topQuote} ⭐️
          </div>
        )}
      </div>

      {/* СРЕДНИЙ БЛОК: ОПИСАНИЕ, ТЕГИ И ТАЙМЛАЙН ПРОЦЕССА */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginBottom: '40px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', margin: '0 0 20px 0', maxWidth: '480px' }}>
            {current.description || ''}
          </p>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {current.tags && Array.isArray(current.tags) ? (
              current.tags.map((t, i) => {
                const tagText = t.tag ? t.tag : t;
                return (
                  <span key={i} style={{ 
                    backgroundColor: '#EAE7DE', 
                    padding: '6px 14px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{tagText}</span>
                );
              })
            ) : (
              <>
                <span style={{ backgroundColor: '#EAE7DE', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>UI/UX</span>
                <span style={{ backgroundColor: '#EAE7DE', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>WEB</span>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'flex-end' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1.5px solid #2B2B2B', 
            borderRadius: '30px', 
            padding: '10px 25px', 
            backgroundColor: 'transparent',
            cursor: 'pointer',
            width: '240px',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '13px',
            letterSpacing: '1px'
          }}>
            <span>☕️ О ПРОЕКТЕ</span>
            <span>➔</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '9px', fontWeight: 'bold', color: '#888', letterSpacing: '0.5px' }}>
            <div style={{ textAlign: 'center' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D9A74A', margin: '0 auto 4px auto' }}></div>КОНЦЕПТ</div>
            <div style={{ textAlign: 'center' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CCC', margin: '0 auto 4px auto' }}></div>UI КИТ</div>
            <div style={{ textAlign: 'center' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CCC', margin: '0 auto 4px auto' }}></div>ДИЗАЙН</div>
            <div style={{ textAlign: 'center' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CCC', margin: '0 auto 4px auto' }}></div>АДАПТИВ</div>
          </div>
        </div>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.2fr 1fr', 
        gap: '35px', 
        borderTop: '1px solid #D1CFC8', 
        paddingTop: '35px',
        position: 'relative'
      }}>
        
        {/* Колонка 1: ЗАДАЧА */}
        <div style={{ borderRight: '1px solid #D1CFC8', paddingRight: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', color: '#555' }}>ЗАДАЧА</h4>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#444' }}>
            {current.task || 'Описание задачи отсутствует.'}
          </p>
          {current.leftQuote && (
            <p style={{ fontFamily: '"Georgia", serif', fontStyle: 'italic', color: '#D9A74A', marginTop: '25px', fontSize: '14px' }}>
              ✨ {current.leftQuote} ♡
            </p>
          )}
        </div>

        {/* Колонка 2: РЕЗУЛЬТАТ */}
        <div style={{ borderRight: '1px solid #D1CFC8', paddingRight: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', color: '#555' }}>РЕЗУЛЬТАТ</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {current.results && Array.isArray(current.results) ? (
              current.results.map((resObj, i) => {
                const txt = resObj.result ? resObj.result : resObj;
                const icon = i % 2 === 0 ? '💻' : '📱';
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', lineHeight: '1.4' }}>
                    <span style={{ fontSize: '18px' }}>{icon}</span>
                    <span style={{ color: '#444' }}>{txt}</span>
                  </div>
                );
              })
            ) : (
              <p style={{ fontSize: '14px' }}>Результаты обрабатываются.</p>
            )}
          </div>
        </div>

        {/* Колонка 3: ЦВЕТА И ШРИФТЫ */}
        <div>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', color: '#555' }}>ЦВЕТА</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {current.colors && Array.isArray(current.colors) ? (
              current.colors.map((cObj, i) => {
                const hex = cObj.colorCode ? cObj.colorCode : cObj;
                return (
                  <div 
                    key={i} 
                    title={hex}
                    style={{ 
                      width: '26px', 
                      height: '26px', 
                      borderRadius: '50%', 
                      backgroundColor: hex,
                      border: '1px solid #D1CFC8',
                      cursor: 'pointer'
                    }} 
                  />
                );
              })
            ) : (
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#4E6E58' }} />
            )}
          </div>

          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', color: '#555' }}>ШРИФТЫ</h4>
          <h3 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
            {current.fonts ? current.fonts.split(',')[0] : 'Montserrat'}
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '14px', color: '#777', fontFamily: 'serif', fontStyle: 'italic' }}>
            {current.fonts && current.fonts.split(',')[1] ? current.fonts.split(',')[1].trim() : 'Nunito'}
          </p>

          {current.rightQuote && (
            <p style={{ 
              fontFamily: '"Georgia", serif', 
              fontStyle: 'italic', 
              color: '#D9A74A', 
              marginTop: '25px', 
              fontSize: '14px',
              textAlign: 'right',
              lineHeight: '1.3'
            }}>
              {current.rightQuote} ♡
            </p>
          )}
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
