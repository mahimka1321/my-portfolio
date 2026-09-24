import React from "react";
import projectsData from "../data/projectsData.json";
import './DesignsList.scss';

function DesignsList({ onSelect }) {
  const list = projectsData.items || [];

  return (
    <div
      className="designs-list-page"
      style={{ padding: "30px", color: "#2B2B2B" }}
    >
      <h2 className="section-title">Мои проекты и дизайны</h2>
      <p className="section-subtitle">
        Выберите кейс, чтобы изучить его архитектуру смыслов:
      </p>

      <div className="blocks-grid">
        {list.map((item, index) => {
          const data = item.fields ? item.fields : item;

          let firstColor = "#4E6E58";
          if (
            data.colors &&
            Array.isArray(data.colors) &&
            data.colors.length > 0
          ) {
            const firstObj = data.colors[0];
            firstColor = firstObj.colorCode ? firstObj.colorCode : firstObj;
          }

          const titleText =
            data.title && data.title !== "-"
              ? `Проект: ${data.title}`
              : `Проект #${index + 1}`;
          const projectId = data.id || `project-${index}`;

          return (
            <div
              key={projectId}
              className="proto-block"
              style={{ backgroundColor: firstColor }}
              onClick={() => onSelect(projectId)}
            >
              <span>{titleText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesignsList;
