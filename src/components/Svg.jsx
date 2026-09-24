// src/components/Svg.jsx
import React from "react";
import './ContentPreview.scss';

// Импортируем тяжелые SVG как полноценные React-компоненты
// Примечание для Vite: для такой записи тебе понадобится плагин vite-plugin-svgr
import { ReactComponent as MainMap } from "../assets/main-architecture-map.svg";
import { ReactComponent as TeaLayout } from "../assets/tea-layout.svg";
import { ReactComponent as HankoyaLayout } from "../assets/hankoya-layout.svg";
import { ReactComponent as TerrariaLayout } from "../assets/terraria-layout.svg";
import { ReactComponent as HandPointer } from "../assets/hand-pointer.svg";
import { ReactComponent as YellowWire } from "../assets/yellow-wire.svg";
import { ReactComponent as TourBox } from "../assets/tour-box.svg";

export const Svg = ({ id, className }) => {
  // Диспетчер проверяет ID и возвращает нужный векторный компонент
  switch (id) {
    // --- ГЛОБАЛЬНЫЕ МАКЕТЫ ДЛЯ ПРАВОЙ ПАНЕЛИ ---
    case "main-architecture-map":
      return <MainMap className={className} />;

    case "tea-layout":
      return <TeaLayout className={className} />;

    case "hankoya-layout":
      return <HankoyaLayout className={className} />;

    case "terraria-layout":
      return <TerrariaLayout className={className} />;

    // --- МЕЛКИЕ ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ ---
    case "hand-pointer":
      return <HandPointer className={className} />;

    case "yellow-wire":
      return <YellowWire className={className} />;

    case "tour-box":
      return <TourBox className={className} />;

    default:
      // Если передали несуществующий ID, система не упадет, а просто промолчит
      return null;
  }
};
