import React, { useEffect, useState } from 'react';
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
  if (!asset || typeof asset !== 'string') return '';
  const value = asset.trim();
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || /^(data:|blob:)/i.test(value)) return value;
  const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  if (publicUrl && (value === publicUrl || value.startsWith(`${publicUrl}/`))) return value;
  if (value.startsWith('/')) return `${publicUrl}${value}`;
  return `${publicUrl}/${value.replace(/^\.\//, '')}`;
};

const getStepImage = (step) => step?.img || step?.image || step?.imageUrl || '';

const publishPreview = (projectId, step) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('project-timeline-preview', {
    detail: {
      projectId: String(projectId || ''),
      image: normalizeAssetPath(getStepImage(step)),
      label: step?.label || ''
    }
  }));
};

function DesignDetail({ id, onBack }) {
  const [activeStep, setActiveStep] = useState('concept');
  const [activeSubStep, setActiveSubStep] = useState('');

  const list = Array.isArray(projectsData.items) ? projectsData.items : [];
  const currentItem = list.find((item) => {
    const data = item?.fields || item;
    return String(data?.id || '').trim().toLowerCase() === String(id || '').trim().toLowerCase();
  });
  const current = currentItem ? (currentItem.fields || currentItem) : null;
  const timelineSteps = Array.isArray(current?.timelineSteps) && current.timelineSteps.length
    ? current.timelineSteps
    : DEFAULT_TIMELINE_STEPS;
  const activeStepData = timelineSteps.find((step) => step.id === activeStep) || timelineSteps[0];
  const activeSubStepData = activeStepData?.subSteps?.find((step) => step.id === activeSubStep);
  const primaryFont = current?.fonts && current.fonts !== '-' ? String(current.fonts).trim() : 'Montserrat';

  useEffect(() => {
    if (!current) return;
    const validStep = timelineSteps.find((step) => step.id === activeStep) || timelineSteps[0];
    if (!validStep) return;
    const validSubStep = validStep.subSteps?.find((step) => step.id === activeSubStep);
    publishPreview(current.id, validSubStep || validStep);
  }, [current, activeStep, activeSubStep, timelineSteps]);

  if (!current) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в CMS. Проверь ID проекта и опубликованные данные.</h2>
      </div>
    );
  }

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
