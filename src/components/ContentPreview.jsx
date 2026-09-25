import React from "react";
import projectsData from "../data/projectsData.json";
import { Svg } from "./Svg"; // Твой оригинальный импорт хаба
import "./ContentPreview.scss";

function ContentPreview({ preview }) {
  const list = projectsData.items || [];

  // 1. Если мы на главной — показываем стартовую карту разума
  if (preview === "map" || !preview) {
    return (
      /* 🔥 ДЛЯ КАРТЫ НА СТАРТЕ ОСТАВЛЯЕМ ДЕФОЛТНЫЙ МОБИЛЬНЫЙ РЕЖИМ (max-width: 668px) */
      <div className="preview-box map-style" data-device="mobile">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  // 2. Вытаскиваем ID проекта из превью (убираем приставку 'preview-')
  const projectId = preview.replace("preview-", "");
  
  // Ищем наш проект в JSON-базе данных
  const projectItem = list.find((item) => {
    const data = item.fields ? item.fields : item;
    return data.id === projectId;
  });

  const project = projectItem ? (projectItem.fields ? projectItem.fields : projectItem) : null;

  // 🔥 ВЫТАСКИВАЕМ ТИП УСТРОЙСТВА ИЗ JSON (если в админке пусто — страхуем и ставим 'mobile')
  const deviceType = project && project.deviceType ? project.deviceType : "mobile";

  // Список всех SVG-айдишников, которые РЕАЛЬНО прописаны у тебя в файле Svg.jsx
  const validSvgIds = [
    "main-architecture-map",
    "tea-layout",
    "tour-box",
    "web-component",
  ];

  if (project && project.previewAsset) {
    // Вытаскиваем чистое имя файла из пути (например, из "src/assets/tourbox.svg" получим "tourbox")
    const svgId = project.previewAsset.split("/").pop().replace(".svg", "");

    // ПРЕДОХРАНИТЕЛЬ: Проверяем, есть ли этот ID в нашем файле Svg.jsx
    if (validSvgIds.includes(svgId)) {
      return (
        /* 🔥 МАГИЯ ТУТ: Твоя рабочая карточка, но теперь с дата-атрибутом ширины! */
        <div className="preview-box dynamic" data-device={deviceType} style={{ overflowY: "auto" }}>
          <div className="svg-layout-container" style={{ width: "100%" }}>
            <Svg id={svgId} />
          </div>
        </div>
      );
    }
  }

  // 3. Заглушка: Если файла нет или он не прописан в Svg.jsx — сайт НЕ упадет!
  return (
    <div className="preview-box map-style" data-device={deviceType}>
      <div
        className="static-map-placeholder"
        style={{ textAlign: "center", color: "#888" }}
      >
        🪐 [МАКЕТ ВЕРСТКИ ГОТОВИТСЯ]
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Вы выбрали кейс "{project?.title || "Проект"}".
          <br />
          Векторный SVG-спринт находится на стадии загрузки на server.
        </p>
      </div>
    </div>
  );
}

export default ContentPreview;