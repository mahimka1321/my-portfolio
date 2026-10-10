import React, { useState, useEffect } from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

// Простая статическая структура, которая железно рендерится
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
  // Железные дефолтные стейты без умных поисков по JSON
  const [activeStep, setActiveStep] = useState('concept');
  const [activeSubStep, setActiveSubStep] = useState('home');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeStep, activeSubStep, id]);

  if (!currentItem) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных</h2>
      </div>
    );
  }
  
  const current = currentItem.fields ? currentItem.fields : currentItem;
  const primaryFont = current.fonts && current.fonts !== '-' ? current.fonts.trim() : 'Montserrat';

  // Простая и понятная функция выбора картинок на чистом if/else
  const getCurrentImage = () => {
    if (activeStep === 'concept') return current.conceptImg || current.previewAsset;
    if (activeStep === 'uikit') return current.uikitImg || current.previewAsset;
    if (activeStep === 'adaptive') return current.adaptiveImg || current.previewAsset;
    
    if (activeStep === 'design') {
      if (activeSubStep === 'home') return current.imgHome || current.previewAsset;
      if (activeSubStep === 'tour') return current.imgTour || current.previewAsset;
      if (activeSubStep === 'profil') return current.imgProfil || current.previewAsset;
    }
    return current.previewAsset;
  };

  return (
    <div className="design-detail-layout">
      
      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <div className="design-detail-page" style={{ '--chosen-font': primaryFont }}>
        <section className="case-top-section">
          <button className="back-btn" onClick={onBack}>
            ⟵ КО ВСЕМ ДИЗАЙНАМ
          </button>

          <div className='case-header-block'>
            <span className="manifesto-tag">UI/UX ДИЗАЙН</span>
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

          <div className="case-middle-block">
            <div className="desc-and-pills">
              <p className="case-description">
                {current.description || 'Описание проекта.'}
              </p>
              <div className="pills-row">
                {current.tags && Array.isArray(current.tags) ? (
                  current.tags.map((t, i) => <span key={i} className="pill-item">{t.tag ? t.tag : t}</span>)
                ) : (
                  <span className="pill-item">UI/UX</span>
                )}
              </div>
            </div>

            <div className="interactive-column">
              <div className="btn-about">
                <span>О ПРОЕКТЕ</span>
                <span>➔</span>
              </div>

              {/* ТАЙМЛАЙН */}
              <div className="timeline-progress">
                {TIMELINE_STEPS.map((step) => {
                  const isStepActive = activeStep === step.id;

                  return (
                    <div key={step.id} className={`step ${isStepActive ? 'active' : ''}`}>
                      <div className="step-main-click">
                        {/* КЛИК СТРОГО НА КРУЖОК */}
                        <div 
                          className={`dot ${isStepActive ? 'active' : ''}`}
                          onClick={() => {
                            setActiveStep(step.id);
                            if (step.subSteps) setActiveSubStep('home');
                          }}
                        ></div>
                        <span>{step.label}</span>
                      </div>

                      {step.subSteps && isStepActive && (
                        <div className="container-for-hidden-text">
                          {step.subSteps.map((subStep) => {
                            const isSubActive = activeSubStep === subStep.id;

                            return (
                              <div key={subStep.id} className="step sub-step-item">
                                {/* КЛИК СТРОГО НА КРУЖОК */}
                                <div 
                                  className={`dot ${isSubActive ? 'active' : ''}`}
                                  onClick={() => setActiveSubStep(subStep.id)}
                                ></div>
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

        <section className="case-bottom-section">
          <div className="info-column">
            <h4>ЗАДАЧА</h4>
            <p>{current.task || 'Задача не описана.'}</p>
          </div>

          <div className="info-column">
            <h4>РЕЗУЛЬТАТ</h4>
            <p>{current.task || 'Результат не описан.'}</p>
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
                <div className="color-circle" style={{ backgroundColor: '#5D5950' }} />
              )}
            </div>
            <h4>ШРИФТЫ</h4>
            <h3 className="font-primary">{primaryFont}</h3>
          </div>
        </section>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ ПРЕВЬЮ */}
      <div className={`right-preview-panel ${current.deviceType === 'desktop' ? 'desktop-mode' : 'mobile-mode'}`}>
        {!isImageLoaded && (
          <div className="image-skeleton-loader">
            <div className="loading-spinner"></div>
            <p>Загрузка макета...</p>
          </div>
        )}
        <img
          src={`/assets/${getCurrentImage()}`} 
          alt="Интерфейс проекта"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)} 
          style={{ display: isImageLoaded ? 'block' : 'none' }}
          className="preview-mockup-img"
        />
      </div>

    </div>
  );
}

export default DesignDetail;
