import React, { useState, useEffect } from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

function DesignDetail({ id, onBack }) {
  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  const current = currentItem?.fields ? currentItem.fields : currentItem;

  // Динамически получаем этапы прогресс-бара из админки
  const stepsFromAdmin = current?.timelineSteps || [];

  // ИСПРАВЛЕНО: Безопасный выбор дефолтных стейтов из массива шагов
  const [activeStep, setActiveStep] = useState(stepsFromAdmin[0]?.id || 'concept');
  const [activeSubStep, setActiveSubStep] = useState(
    stepsFromAdmin.find(s => s.subSteps)?.subSteps[0]?.id || 'home'
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Сбрасываем лоадер при каждом переключении
  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeStep, activeSubStep, id]);

  if (!currentItem) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных админки</h2>
      </div>
    );
  }
  
  const primaryFont = current.fonts && current.fonts !== '-' ? current.fonts.trim() : 'Montserrat';

  // Функция поиска имени файла картинки
  const getCurrentImage = () => {
    const mainStep = stepsFromAdmin.find(s => s.id === activeStep);
    if (!mainStep) return current.previewAsset;

    if (activeStep === 'design' && mainStep.subSteps) {
      const subStep = mainStep.subSteps.find(ss => ss.id === activeSubStep);
      return subStep?.img || current.previewAsset;
    }

    return mainStep.img || current.previewAsset;
  };

  return (
    <div className="design-detail-layout">
      
      {/* ЛЕВАЯ ПАНЕЛЬ С КОНТЕНТОМ */}
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
                {current.description || 'Описание проекта отсутствует.'}
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

              {/* ТАЙМЛАЙН ПРОГРЕСС-БАРA */}
              {stepsFromAdmin.length > 0 && (
                <div className="timeline-progress">
                  {stepsFromAdmin.map((step) => {
                    const isStepActive = activeStep === step.id;

                    return (
                      <div key={step.id} className={`step ${isStepActive ? 'active' : ''}`}>
                        <div className="step-main-click">
                          <div 
                            className={`dot ${isStepActive ? 'active' : ''}`}
                            onClick={() => {
                              setActiveStep(step.id);
                              if (step.subSteps && step.subSteps.length > 0) {
                                setActiveSubStep(step.subSteps[0].id);
                              }
                            }}
                          ></div>
                          <span>{step.label}</span>
                        </div>

                        {/* ВЫПАДАЮЩИЕ ПОД-ШАГИ */}
                        {step.subSteps && isStepActive && (
                          <div className="container-for-hidden-text">
                            {step.subSteps.map((subStep) => {
                              const isSubActive = activeSubStep === subStep.id;

                              return (
                                <div key={subStep.id} className="step sub-step-item">
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
              )}
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
            <div className="results-list">
              {current.results && Array.isArray(current.results) ? (
                current.results.map((resObj, i) => (
                  <div key={i} className="result-item">
                    <span className="text">{resObj.result ? resObj.result : resObj}</span>
                  </div>
                ))
              ) : (
                <div className="result-item"><span className="text">Готово</span></div>
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
                <div className="color-circle" style={{ backgroundColor: '#222529' }} />
              )}
            </div>

            <h4>ШРИФТЫ</h4>
            <h3 className="font-primary">{primaryFont}</h3>
            <p className="font-secondary">{primaryFont} (Normal)</p>
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
        
        {/* ИСПРАВЛЕНО: путь изменен на относительный под сборщик билда. Добавлен onError */}
        <img
          src={`./assets/${getCurrentImage()}`} 
          alt="Интерфейс проекта"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)} 
          style={{ opacity: isImageLoaded ? 1 : 0 }}
          className="preview-mockup-img"
        />
      </div>

    </div>
  );
}

export default DesignDetail;
