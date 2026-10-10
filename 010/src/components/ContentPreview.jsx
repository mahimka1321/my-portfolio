import React from "react";
import projectsData from "../data/projectsData.json";
import { Svg, hasSvg } from "./ui/Svg/Svg";
import teaLayouttPreview from "../assets/tea-layout.png";
import tourBoxPreview from "../assets/tour-box.webp";
import webComponentPreview from "../assets/web-component.webp";
import "./ContentPreview.scss";

const rasterPreviews = {
  "tea-layout.png": teaLayouttPreview,
  "tour-box.webp": tourBoxPreview,
  "web-component.webp": webComponentPreview,
};

const findProject = (id) => {
  return (projectsData.items || []).find((item) => {
    const data = item.fields || item;
    return (
      String(data.id).trim().toLowerCase() === String(id).trim().toLowerCase()
    );
  });
};

function ContentPreview({ preview }) {
  if (preview === "map" || !preview) {
    return (
      <div className="preview-box map-style" data-device="mobile">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  const projectId = preview.replace(/^preview-/, "").trim();
  const projectItem = findProject(projectId);
  const project = projectItem ? projectItem.fields || projectItem : null;
  const deviceType = project?.deviceType || "mobile";
  const fileName = project?.previewAsset?.trim().split("/").pop();

  if (project && fileName) {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (["webp", "png", "jpg", "jpeg"].includes(fileExtension)) {
      const imageSrc = rasterPreviews[fileName];

      if (imageSrc) {
        return (
          <div className="preview-box dynamic" data-device={deviceType}>
            <div className="media-layout-container">
              <img
                src={imageSrc}
                alt={project.title || "Design Preview"}
                className="preview-img-asset"
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
          </div>
        );
      }
    }

    if (fileExtension === "svg") {
      const svgId = fileName.replace(/\.svg$/i, "");
      const hasSvgPreview = hasSvg(svgId);

      if (hasSvgPreview) {
        return (
          <div className="preview-box dynamic" data-device={deviceType}>
            <div className="svg-layout-container">
              <Svg id={svgId} />
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="preview-box map-style" data-device={deviceType}>
      <div className="static-map-placeholder">
        🪐 [МАКЕТ ВЕРСТКИ ГОТОВИТСЯ]
        <p>Вы выбрали кейс "{project?.title || "Проект"}".</p>
      </div>
    </div>
  );
}

export default ContentPreview;
