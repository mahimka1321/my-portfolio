import React, { useEffect, useState } from 'react';
import projectsData from '../data/projectsData.json';
import './DesignDetail.scss';

const normalizeAssetPath = (asset) => {
  if (!asset) return '';

  const value = String(asset).trim();

  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) {
    return value;
  }

  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPath = value
    .replace(/^\.\//, '')
    .replace(/^\/+/, '');

  return `${publicUrl}/${cleanPath}`;
};

const getStepImage = (step) => {
  if (!step) return '';

  return step.image || step.img || step.imageUrl || '';
};

const publishPreview = (projectId, step) => {
  window.dispatchEvent(
    new CustomEvent('project-timeline-preview', {
      detail: {
        projectId,
        image: normalizeAssetPath(getStepImage(step)),
        label: step?.label || '',
      },
    })
  );
};

function DesignDetail({ id, onBack }) {
  const [activeStep, setActiveStep] = useState('');
  const [activeSubStep, setActiveSubStep] = useState('');

  const list = Array.isArray(projectsData.items)
    ? projectsData.items
    : Array.isArray(projectsData)
      ? projectsData
      : [];

  const currentItem = list.find((item) => {
    const data = item.fields || item;
    return String(data.id) === String(id);
  });

  const current = currentItem
    ? currentItem.fields || currentItem
    : null;

  const timelineSteps = Array.isArray(current?.timelineSteps)
    ? current.timelineSteps
    : [];

  const activeStepData =
    timelineSteps.find((step) => step.id === activeStep) ||
    timelineSteps[0] ||
    null;

  const subSteps = Array.isArray(activeStepData?.subSteps)
    ? activeStepData.subSteps
    : [];

  const activeSubStepData =
    subSteps.find((step) => step.id === activeSubStep) || null;

  const selectedPreviewStep = activeSubStepData || activeStepData;

  const primaryFont =
    current?.fonts && current.fonts !== '-'
      ? current.fonts.trim()
      : 'Montserrat';

  useEffect(() => {
    if (!current) return;

    const firstStep = Array.isArray(current.timelineSteps)
      ? current.timelineSteps[0]
      : null;

    setActiveStep(firstStep?.id || '');
    setActiveSubStep(firstStep?.subSteps?.[0]?.id || '');
  }, [current?.id]);

  useEffect(() => {
    if (!current) return;

    if (!selectedPreviewStep) {
      publishPreview(current.id, null);
      return;
    }

    publishPreview(current.id, selectedPreviewStep);
  }, [current?.id, activeStepData?.id, activeSubStepData?.id]);

  if (!current) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных</h2>
        <button className="back-btn" onClick={onBack}>
          ⟵ КО ВСЕМ ДИЗАЙНАМ
        </button>
      </div>
    );
  }

  return (
    <div
      className="design-detail-page"
      style={{ '--chosen-font': primaryFont }}
    >
      <section className="case-top-section">
        <button className="back-btn" onClick={onBack}>
          ⟵ КО ВСЕМ ДИЗАЙНАМ
        </button>

        <div className="case-header-block">
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

        <div className="case-middle-block">
          <div className="desc-and-pills">
            <p className="case-description">
              {current.description ||
                'Дизайн сайта для небольшого чайного магазина, где традиции, уют и простота встречаются в современном цифровом формате.'}
            </p>

            <div className="pills-row">
              {Array.isArray(current.tags) ? (
                current.tags.map((tag, index) => (
                  <span className="pill-item" key={index}>
                    {tag.tag || tag}
                  </span>
                ))
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

            <div className="timeline-progress">
              {timelineSteps.map((step, index) => {
                const isStepActive =
                  (activeStepData?.id || timelineSteps[0]?.id) === step.id;

                return (
                  <div
                    key={step.id || index}
                    className={`step ${isStepActive ? 'active' : ''}`}
                  >
                    <div className="step-main-click">
                      <button
                        type="button"
                        className={`dot timeline-dot ${
                          isStepActive ? 'active' : ''
                        }`}
                        aria-label={`Показать этап: ${
                          step.label || `Шаг ${index + 1}`
                        }`}
                        aria-pressed={isStepActive}
                        onClick={() => {
                          setActiveStep(step.id || '');
                          setActiveSubStep(step.subSteps?.[0]?.id || '');
                          publishPreview(
                            current.id,
                            step.subSteps?.[0] || step
                          );
                        }}
                      />

                      <span className={isStepActive ? 'text-active' : ''}>
                        {step.label || `Шаг ${index + 1}`}
                      </span>
                    </div>

                    {Array.isArray(step.subSteps) &&
                      step.subSteps.length > 0 &&
                      isStepActive && (
                        <div className="container-for-hidden-text">
                          {step.subSteps.map((subStep, subIndex) => {
                            const isSubActive =
                              activeSubStep === subStep.id;

                            return (
                              <div
                                key={subStep.id || subIndex}
                                className="step sub-step-item"
                              >
                                <button
                                  type="button"
                                  className={`dot timeline-dot ${
                                    isSubActive ? 'active' : ''
                                  }`}
                                  aria-label={`Показать этап: ${
                                    subStep.label ||
                                    `Подшаг ${subIndex + 1}`
                                  }`}
                                  aria-pressed={isSubActive}
                                  onClick={() => {
                                    setActiveSubStep(subStep.id || '');
                                    publishPreview(current.id, subStep);
                                  }}
                                />

                                <span
                                  className={
                                    isSubActive ? 'text-active' : ''
                                  }
                                >
                                  {subStep.label ||
                                    `Подшаг ${subIndex + 1}`}
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

            {timelineSteps.length === 0 && (
              <p className="timeline-empty">
                Добавь этапы проекта в админке.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="case-bottom-section">
        <div className="info-column">
          <h4>ЗАДАЧА</h4>
          <p>
            {current.task ||
              'Создать удобный и эстетичный интерфейс для онлайн-магазина чая.'}
          </p>
        </div>

        <div className="info-column">
          <h4>РЕЗУЛЬТАТ</h4>

          <div className="results-list">
            {Array.isArray(current.results) ? (
              current.results.map((result, index) => (
                <div key={index} className="result-item">
                  {typeof result === 'object' && result.icon && (
                    <span className="icon">{result.icon}</span>
                  )}

                  <span className="text">
                    {result.result || result}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="result-item">
                  <span className="icon">💻</span>
                  <span className="text">
                    Современный, чистый интерфейс с акцентом на атмосферу
                  </span>
                </div>

                <div className="result-item">
                  <span className="icon">📱</span>
                  <span className="text">
                    Адаптивная версия для всех устройств
                  </span>
                </div>

                <div className="result-item">
                  <span className="icon">🛒</span>
                  <span className="text">
                    Удобная навигация и быстрый чек-аут
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="info-column">
          <h4>ЦВЕТА</h4>

          <div className="colors-row">
            {Array.isArray(current.colors) ? (
              current.colors.map((color, index) => {
                const hex =
                  color.colorCode ||
                  color.color ||
                  color.value ||
                  (typeof color === 'string' ? color : '#222529');

                return (
                  <div
                    key={index}
                    className="color-circle"
                    style={{ backgroundColor: hex }}
                  />
                );
              })
            ) : (
              <>
                <div
                  className="color-circle"
                  style={{ backgroundColor: '#5D5950' }}
                />
                <div
                  className="color-circle"
                  style={{ backgroundColor: '#DFD5C7' }}
                />
                <div
                  className="color-circle"
                  style={{ backgroundColor: '#607647' }}
                />
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
