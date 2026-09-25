import React from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  if (!currentItem) {
    return <div className="design-detail-page"><h2>Проект не найден в базе данных</h2></div>;
  }
  
  const current = currentItem.fields ? currentItem.fields : currentItem;
  const primaryFont = current.fonts && current.fonts !== '-' ? current.fonts.trim() : 'Montserrat';

  return (
    <div className="design-detail-page" style={{ '--chosen-font': primaryFont }}>
      
      {/* ПЕРВАЯ СЕКЦИЯ: ШАПКА, ИНФОРМАЦИЯ, КНОПКА И ПРОГРЕСС-БАР */}
      <section className="case-top-section">
        {/* стрелочка назад */}
        <button className="back-btn" onClick={onBack}>
          ← К ВСЕМ ДИЗАЙНАМ
        </button>

        {/* текст информации + заголовок */}
        <div className="case-header-block">
          <span className="case-tag">UI / UX ДИЗАЙН</span>
          <h1 className="case-main-title">{current.title || 'БЕЗ НАЗВАНИЯ'}</h1>
          
          {/* Твоя фирменная оранжевая подпись с лучиками по бокам */}
          <div className="case-signature-wrap">
            <span className="signature-ray left"></span>
            <p className="signature-text">{current.subtitle || 'Традиции в цифровом формате'}</p>
            <span className="signature-ray right"></span>
          </div>
        </div>

        {/* доп текст из json + кнопка + прогресс бар */}
        <div className="case-middle-block">
          <div className="desc-and-pills">
            <p className="case-description">
              {current.description || 'Дизайн сайта для небольшого чайного магазина, где традиции, уют и простота встречаются в современном цифровом формате.'}
            </p>
            <div className="pills-row">
              {current.tags && Array.isArray(current.tags) ? (
                current.tags.map((t, i) => <span key={i} className="pill-item">{t.tag ? t.tag : t}</span>)
              ) : (
                <>
                  <span className="pill-item">UI/UX</span>
                  <span className="pill-item">E-COMMERCE</span>
                  <span className="pill-item">WEB</span>
                </>
              )}
            </div>
          </div>

          <div className="interactive-column">
            {/* Рукописный текст "Чай - это тоже забота" строго над кнопкой */}
            {current.topQuote && (
              <div className="handwritten-top-quote">{current.topQuote} ⭐️</div>
            )}
            
            <div className="btn-about">
              <span>☕️ О ПРОЕКТЕ</span>
              <span>➔</span>
            </div>

            {/* Прогресс-бар / таймлайн этапов */}
            <div className="timeline-progress">
              <div className="step"><div className="dot active"></div><span>концепт</span></div>
              <div className="step"><div className="dot"></div><span>ui кит</span></div>
              <div className="step"><div className="dot"></div><span>дизайн</span></div>
              <div className="step"><div className="dot"></div><span>адаптив</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ВТОРЯЯ СЕКЦИЯ: ТРЕХКОЛОНОЧНЫЙ БЛОК ХАРАКТЕРИСТИК */}
      <section className="case-bottom-section">
        {/* колонка 1 задаца + текст из json */}
        <div className="info-column">
          <h4>ЗАДАЧА</h4>
          <p>{current.task || 'Создать удобный и эстетичный интерфейс для онлайн-магазина чая...'}</p>
          {current.leftQuote && <p className="quote-style italic-left">✨ {current.leftQuote} ♡</p>}
        </div>

        {/* колонка 2 результат */}
        <div className="info-column">
          <h4>РЕЗУЛЬТАТ</h4>
          <div className="results-list">
            {current.results && Array.isArray(current.results) ? (
              current.results.map((resObj, i) => (
                <div key={i} className="result-item">
                  <span className="icon">💻</span>
                  <span className="text">{resObj.result ? resObj.result : resObj}</span>
                </div>
              ))
            ) : (
              <>
                <div className="result-item"><span className="icon">💻</span><span className="text">Современный, чистый интерфейс с акцентом на атмосферу</span></div>
                <div className="result-item"><span className="icon">📱</span><span className="text">Адаптивная версия для всех устройств</span></div>
                <div className="result-item"><span className="icon">🛒</span><span className="text">Удобная навигация и быстрый чек-аут</span></div>
              </>
            )}
          </div>
        </div>

        {/* колонка 3 цвета + шрифт + текст из json */}
        <div className="info-column">
          <h4>ЦВЕТА</h4>
          <div className="colors-row">
            {current.colors && Array.isArray(current.colors) ? (
              current.colors.map((cObj, i) => {
                const hex = cObj.colorCode || cObj.color || cObj.value || (typeof cObj === 'string' ? cObj : '#222529');
                return <div key={i} className="color-circle" style={{ backgroundColor: hex }} />;
              })
            ) : (
              <>
                <div className="color-circle" style={{ backgroundColor: '#5D5950' }} />
                <div className="color-circle" style={{ backgroundColor: '#DFD5C7' }} />
                <div className="color-circle" style={{ backgroundColor: '#607647' }} />
              </>
            )}
          </div>

          <h4>ШРИФТЫ</h4>
          <h3 className="font-primary">{primaryFont}</h3>
          <p className="font-secondary">{primaryFont} (Italic)</p>
          
          {current.rightQuote && <p className="quote-style italic-right">{current.rightQuote} ♡</p>}
        </div>
      </section>

    </div>
  );
}

export default DesignDetail;
