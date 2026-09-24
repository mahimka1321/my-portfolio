// src/components/Svg.jsx
import React from "react";
import './ContentPreview.scss';

// Импортируем тяжелые SVG как полноценные React-компоненты
// Примечание для Vite: для такой записи тебе понадобится плагин vite-plugin-svgr
import { ReactComponent as MainMap } from "../assets/main-architecture-map.svg";
import { ReactComponent as TeaLayout } from "../assets/tea-layout.svg";
import { ReactComponent as TourBox } from "../assets/tour-box.svg";
import { ReactComponent as WebComponent } from "../assets/web-component.svg";

export const Svg = ({ id, className }) => {
  // Диспетчер проверяет ID и возвращает нужный векторный компонент
  switch (id) {
    // --- ГЛОБАЛЬНЫЕ МАКЕТЫ ДЛЯ ПРАВОЙ ПАНЕЛИ ---
    case "main-architecture-map":
      return <MainMap className={className} />;

    case "tea-layout":
      return <TeaLayout className={className} />;

    case "tour-box":
      return <TourBox className={className} />;

    case "web-component":
      return <WebComponent className={className} />;

    default:
      // Если передали несуществующий ID, система не упадет, а просто промолчит
      return null;
  }
};
