import React, { useState } from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

const DEFAULT_TIMELINE_STEPS = [
  { id: 'concept', label: 'концепт', img: '' },
  { id: 'uikit', label: 'ui кит', img: '' },
  { id: 'design', label: 'дизайн', img: '', subSteps: [
    { id: 'home', label: 'Home', img: '' },
    { id: 'tour', label: 'Tour', img: '' },
    { id: 'profil', label: 'Profil', img: '' }
  ] },
  { id: 'adaptive', label: 'адаптив', img: '' }
];

const normalizeAssetPath = (asset) => {
  if (!asset) return '';
  const value = String(asset).trim();
  if (/^(https?:)?\//i.test(value)) return value;
  return `${process.env.PUBLIC_URL || ''}/${value.replace(/^\.\//, '').replace(/^\//, '')}`;
};

const publishPreview = (projectId, step) => {
  window.dispatchEvent(new CustomEvent('project-timeline-preview', {
    detail: { projectId, image: normalizeAssetPath(step?.img), label: step?.label || '' }
  }));
};

function DesignDetail({ id, onBack }) {
  // Хуки стейтов объявлены на самом верху компонента
  const [activeStep, setActiveStep] = useState('concept');
  const [activeSubStep, setActiveSubStep] = useState('home');

  const list = projectsData.items || [];
  
  const currentItem = list.find(item => {
    const data = item.fields ? item.fields : item;
    return data.id === id;
  });

  // Все хуки должны вызываться до любого условного возврата.
  React.useEffect(() => {
    if (!currentItem) return;

    const project = currentItem.fields ? currentItem.fields : currentItem;
    const steps = Array.isArray(project.timelineSteps) && project.timelineSteps.length
      ? project.timelineSteps
      : DEFAULT_TIMELINE_STEPS;
    const selectedStep = steps.find(step => step.id === activeStep) || steps[0];
    const selectedSubStep = selectedStep?.subSteps?.find(step => step.id === activeSubStep);

    publishPreview(project.id, selectedSubStep || selectedStep);
  }, [currentItem, activeStep, activeSubStep]);

  // Ранний возврат, если проект не найден — после вызова всех хуков.
  if (!currentItem) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных</h2>
      </div>
    );
  }
  
  const current = currentItem.fields ? currentItem.fields : currentItem;
  const timelineSteps = Array.isArray(current.timelineSteps) && current.timelineSteps.length
    ? current.timelineSteps
    : DEFAULT_TIMELINE_STEPS;
  const activeStepData = timelineSteps.find(step => step.id === activeStep) || timelineSteps[0];
  const activeSubStepData = activeStepData?.subSteps?.find(step => step.id === activeSubStep);
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
              {timelineSteps.map((step) => {
                const isStepActive = activeStep === step.id;

                return (
                  <div 
                    key={step.id} 
                    className={`step ${isStepActive ? 'active' : ''}`}
                  >
                    {/* Главная кликабельная область шага */}
                    <div className="step-main-click">
                      <button
                        type="button"
                        className={`dot timeline-dot ${isStepActive ? 'active' : ''}`}
                        aria-label={`Показать этап: ${step.label}`}
                        aria-pressed={isStepActive}
                        onClick={() => {
                          setActiveStep(step.id);
                          setActiveSubStep(step.subSteps?.[0]?.id || '');
                          publishPreview(current.id, step);
                        }}
                      />
                      <span className={isStepActive ? 'text-active' : ''}>{step.label}</span>
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
                            >
                              <button
                                type="button"
                                className={`dot timeline-dot ${isSubActive ? 'active' : ''}`}
                                aria-label={`Показать этап: ${subStep.label}`}
                                aria-pressed={isSubActive}
                                onClick={() => {
                                  setActiveSubStep(subStep.id);
                                  publishPreview(current.id, subStep);
                                }}
                              />
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
