import React from "react";
import { ReactComponent as MainMap } from "../../../assets/svg/main-architecture-map.svg";

const SVG_REGISTRY = {
  "main-architecture-map": MainMap,
};

export const Svg = ({ id, className }) => {
  const SvgComponent = SVG_REGISTRY[id];
  if (!SvgComponent) return null;
  return <SvgComponent className={className} />;
};

export const hasSvg = (id) => Boolean(SVG_REGISTRY[id]);
