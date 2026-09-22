import React from 'react';
import projectsData from './data/projectsData.json';
import { Svg } from './Svg'; // Твой созданный хаб векторного кода

function ContentPreview({ preview }) {
  // Если мы на главной — показываем стартовую карту разума
  if (preview === 'map') {
    return (
      <div className="preview-box map-style">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  // Вытаскиваем ID проекта из превью (убираем приставку 'preview-')
  const projectId = preview.replace('preview-', '');
  const list = projectsData.items || [];
  const project = list.find(item => item.id === projectId);

  // Если проект найден и у него загружен макет, рендерим его из хаба Svg
  if (project && project.previewAsset) {
    return (
      <div className="preview-box dynamic" style={{ overflowY: 'auto' }}>
        <div className="svg-layout-container" style={{ width: '100%' }}>
          {/* Админка сохраняет полный путь, берем только имя файла для хаба */}
          <Svg id={project.previewAsset.split('/').pop().replace('.svg', '')} />
        </div>
      </div>
    );
  }

  return <div className="preview-box">Превью отсутствует</div>;
}

export default ContentPreview;
