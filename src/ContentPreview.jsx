// src/components/ContentPreview.jsx
import React from 'react';
import { projectsData } from './data/projectsData';
import { Svg } from './Svg'; // Твой созданный хаб векторного кода

function ContentPreview({ preview }) {
  // Если мы на главной — показываем стартовую статическую карту разума
  if (preview === 'map') {
    return (
      <div className="preview-box map-style">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  // Если выбран конкретный проект, вытаскиваем его ID (например, из 'preview-tea' берем 'tea')
  const projectId = preview.replace('preview-', '');
  const project = projectsData[projectId];

  if (project && project.previewType === 'svg-scroll') {
    return (
      <div className="preview-box dynamic-scroll">
        <div className="svg-layout-container">
          {/* Рендерим один сплошной длинный SVG-макет верстки из хаба */}
          <Svg id={project.previewAsset} />
        </div>
      </div>
    );
  }

  return <div className="preview-box">Превью отсутствует</div>;
}

export default ContentPreview;