import React, { useState } from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

// Статическая структура таймлайна вынесена за пределы компонента
const TIMELINE_STEPS = [
  { id: 'concept', label: 'концепт' },
  { id: 'uikit', label: 'ui кит' },
  { 
    id: 'design', 
    label: 'дизайн',
    subSteps: [
      { id: 'home', label: 'Home' },
      { id: 'tour', label: 'Tour' },
      { id: 'profil', label: 'Profil' }
    ]
  },
  { id: 'adaptive', label: 'адаптив' }
];

function DesignDetail({ id, onBack }) {
  // Хуки стейтов объявлены на самом верху компонента
  const [activeStep, setActiveStep] = useState('concept');
  const [activeSubStep, setActiveSubStep] = useState('home');

  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  // Ранний возврат, если проект не найден
  if (!currentItem) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных</h2>
      </div>
    );
  }
  
  const current = currentItem.fields ? currentItem.fields : currentItem;
  const primaryFont = current.fonts && current.fonts !== '-' ? current.fonts.trim() : 'Montserrat';

  return (
    <div className="design-detail-page" style={{ '--chosen-font': primaryFont }}>
      
      {/* ПЕРВАЯ СЕКЦИЯ: ШАПКА, ИНФОРМАЦИЯ, КНОПКА И ПРОГРЕСС-БАР */}
      <section className="case-top-section">
        {/* Стрелочка назад */}
        <button className="back-btn" onClick={onBack}>
          ⟵ КО ВСЕМ ДИЗАЙНАМ
        </button>

        {/* Текст информации + заголовок */}
        <div className='case-header-block'>
          <span className="manifesto-tag">
            UI/UX ДИЗАЙН
          </span>
          <h1>
            {current.title || 'БЕЗ НАЗВАНИЯ'}
            <br />
            <span className="invalig--rag-ps">
              <span />
              {current.subtitle || 'Традиции в цифровом формате'}
              <span />
            </span>
          </h1>
        </div>

        {/* Доп текст из json + кнопка + прогресс бар */}
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
            <div className="btn-about">
              <span>О ПРОЕКТЕ</span>
              <span>➔</span>
            </div>

            {/* ДИНАМИЧЕСКИЙ ТАЙМЛАЙН */}
            <div className="timeline-progress">
              {TIMELINE_STEPS.map((step) => {
                const isStepActive = activeStep === step.id;

                return (
                  <div 
                    key={step.id} 
                    className={`step ${isStepActive ? 'active' : ''}`}
                  >
                    {/* Главная кликабельная область шага */}
                    <div 
                      className="step-main-click" 
                      onClick={() => {
                        setActiveStep(step.id);
                        if (step.subSteps) setActiveSubStep('home');
                      }}
                    >
                      <div className={`dot ${isStepActive ? 'active' : ''}`}></div>
                      <span>{step.label}</span>
                    </div>

                    {/* ВЫПАДАЮЩЕЕ ДЕРЕВО ПОД-ШАГОВ */}
                    {step.subSteps && isStepActive && (
                      <div className="container-for-hidden-text">
                        {step.subSteps.map((subStep) => {
                          const isSubActive = activeSubStep === subStep.id;

                          return (
                            <div 
                              key={subStep.id} 
                              className="step sub-step-item"
                              onClick={() => setActiveSubStep(subStep.id)}
                            >
                              <div className={`dot ${isSubActive ? 'active' : ''}`}></div>
                              <span className={isSubActive ? 'text-active' : ''}>
                                {subStep.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ВТОРAЯ СЕКЦИЯ: ТРЕХКОЛОНОЧНЫЙ БЛОК ХАРАКТЕРИСТИК */}
      <section className="case-bottom-section">
        <div className="info-column">
          <h4>ЗАДАЧА</h4>
          <p>{current.task || 'Создать удобный и эстетичный интерфейс для онлайн-магазина чая...'}</p>
        </div>

        <div className="info-column">
          <h4>РЕЗУЛЬТАТ</h4>
          <div className="results-list">
            {current.results && Array.isArray(current.results) ? (
              current.results.map((resObj, i) => (
                <div key={i} className="result-item">
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
        </div>
      </section>

    </div>
  );
}

export default DesignDetail;
