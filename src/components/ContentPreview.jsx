import React, { useEffect, useState } from "react";
import projectsData from "../data/projectsData.json";
import { Svg } from "./ui/Svg/Svg";
import "./ContentPreview.scss";

const normalizeAssetPath = (asset) => {
  if (!asset || typeof asset !== "string") return "";
  const value = asset.trim();
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || /^(data:|blob:)/i.test(value)) return value;

  const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  if (publicUrl && (value === publicUrl || value.startsWith(`${publicUrl}/`))) return value;
  if (value.startsWith("/")) return `${publicUrl}${value}`;
  return `${publicUrl}/${value.replace(/^\.\//, "")}`;
};

const getProjectData = (item) => (item && item.fields ? item.fields : item);

const findProject = (id) => {
  const normalizedId = String(id || "").trim().toLowerCase();
  return (projectsData.items || []).find((item) => {
    const data = getProjectData(item);
    return String(data?.id || "").trim().toLowerCase() === normalizedId;
  });
};

function ContentPreview({ preview }) {
  const [timelinePreview, setTimelinePreview] = useState(null);

  useEffect(() => {
    const handleTimelinePreview = (event) => setTimelinePreview(event.detail || null);
    window.addEventListener("project-timeline-preview", handleTimelinePreview);
    return () => window.removeEventListener("project-timeline-preview", handleTimelinePreview);
  }, []);

  if (preview === "map" || !preview) {
    return (
      <div className="preview-box map-style" data-device="mobile">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  const projectId = String(preview).replace(/^preview-/, "").trim();
  const projectItem = findProject(projectId);
  const project = getProjectData(projectItem);
  const deviceType = project?.deviceType || "mobile";
  const activeTimelineImage =
    String(timelinePreview?.projectId || "").trim().toLowerCase() ===
    String(project?.id || "").trim().toLowerCase()
      ? normalizeAssetPath(timelinePreview?.image)
      : "";
  const previewAsset = normalizeAssetPath(project?.previewAsset || project?.previewImage || "");
  const imageSrc = activeTimelineImage || previewAsset;

  if (imageSrc) {
    return (
      <div className="preview-box dynamic" data-device={deviceType}>
        <div className="media-layout-container">
          <img
            src={imageSrc}
            alt={timelinePreview?.label || project?.title || "Превью проекта"}
            className="preview-img-asset"
            style={{ objectFit: "cover", width: "100%" }}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="preview-box map-style" data-device={deviceType}>
      <div className="static-map-placeholder">
        🪐 [МАКЕТ НЕ ДОБАВЛЕН]
        <p>Добавь изображение в CMS для проекта «{project?.title || "Проект"}».</p>
      </div>
    </div>
  );
}

export default ContentPreview;
