import React from 'react';
import projectsData from './data/projectsData.json';
import { Svg } from './Svg'; // Импортируем твой хаб без фигурных скобок

function ContentPreview({ preview }) {
  // 1. Если мы на главной — показываем стартовую карту разума
  if (preview === 'map') {
    return (
      <div className="preview-box map-style">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  // 2. Вытаскиваем ID проекта из превью (убираем приставку 'preview-')
  const projectId = preview.replace('preview-', '');
  const list = projectsData.items || [];
  const project = list.find(item => item.id === projectId);

  // Список всех SVG-айдишников, которые РЕАЛЬНО прописаны у тебя в файле Svg.jsx
  // Дописывай сюда имена (кейсы) из своего Svg.jsx, когда будешь добавлять новые SVG!
  const validSvgIds = ['main-architecture-map', 'tea-layout', 'hankoya-layout', 'terraria-layout', 'hand-pointer', 'yellow-wire', 'tour-box'];

  if (project && project.previewAsset) {
    // Вытаскиваем чистое имя файла из пути (например, из "src/assets/tourbox.svg" получим "tourbox")
    const svgId = project.previewAsset.split('/').pop().replace('.svg', '');

    // 🔥 ПРЕДОХРАНИТЕЛЬ: Проверяем, есть ли этот ID в нашем файле Svg.jsx
    if (validSvgIds.includes(svgId)) {
      return (
        <div className="preview-box dynamic" style={{ overflowY: 'auto' }}>
          <div className="svg-layout-container" style={{ width: '100%' }}>
            <Svg id={svgId} />
          </div>
        </div>
      );
    }
  }

  // 3. Заглушка: Если файла tourbox.svg нет или он не прописан в Svg.jsx — сайт НЕ упадет!
  // Он просто покажет красивый дзен-бокс ожидания
  return (
    <div className="preview-box map-style">
      <div className="static-map-placeholder" style={{ textAlign: 'center', color: '#888' }}>
        🪐 [МАКЕТ ВЕРСТКИ ГОТОВИТСЯ]
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Вы выбрали кейс "{project?.title || 'Проект'}".<br />
          Векторный SVG-спринт находится на стадии загрузки на сервер.
        </p>
      </div>
    </div>
  );
}

export default ContentPreview;
