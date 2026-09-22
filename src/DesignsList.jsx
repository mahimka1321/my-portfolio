// src/components/DesignDetail.jsx
import React from 'react';
import { projectsData } from '../data/projectsData';

function DesignDetail({ id, onBack }) {
  // Мгновенно вытаскиваем данные нужного проекта по его ID
  const project = projectsData[id];

  // Если вдруг проекта с таким ID нет в базе, страхуем систему
  if (!project) return <div>Проект не найден</div>;

  return (
    <div className="design-detail-page">
      <button className="back-btn" onClick={onBack}>← К ВСЕМ ДИЗАЙНАМ</button>
      
      <span className="ui-ux-tag">UI / UX ДИЗАЙН</span>
      <h1 className="main-title">{project.title}</h1>
      <p className="subtitle">{project.subtitle}</p>
      <p className="description-text">{project.description}</p>
      
      <div className="tags-row">
        {project.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
      </div>

      <div className="case-grid">
        <div className="case-block">
          <h3>ЗАДАЧА</h3>
          <p>{project.task}</p>
        </div>
        
        <div className="case-block">
          <h3>РЕЗУЛЬТАТ</h3>
          <p>{project.results.map((res, i) => <span key={i}>• {res}<br/></span>)}</p>
        </div>
        
        <div className="case-block">
          <h3>ЦВЕТА</h3>
          <div className="color-circles">
            {project.colors.map((color, i) => (
              <div key={i} className="circle" style={{ backgroundColor: color }} />
            ))}
          </div>
          <h3>ШРИФТЫ</h3>
          <p>{project.fonts.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
