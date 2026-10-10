import React, { useEffect, useState } from "react";
import projectsData from "../data/projectsData.json";
import { Svg } from "./ui/Svg/Svg";
import "./ContentPreview.scss";

// Keep compatibility with images that were already imported from src/assets.
const legacyAssets = {};

const normalizeId = (value) => String(value ?? "").trim().toLowerCase();

const getProjectData = (item) => item?.fields || item || {};

const findProject = (id) => {
  const items = Array.isArray(projectsData.items) ? projectsData.items : [];
  return items.find((item) => normalizeId(getProjectData(item).id) === normalizeId(id));
};

/**
 * CMS uploads belong in public/uploads. Their paths are stored in JSON and
 * can be rendered directly, without adding a new JS import for each image.
 * Legacy src/assets images remain supported via the small map above.
 */
const resolveImageSrc = (asset, { preferUploads = false } = {}) => {
  if (!asset || typeof asset !== "string") return "";
  const value = asset.trim();
  if (!value) return "";

  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  const cleanValue = value.split(/[?#]/)[0];
  const fileName = cleanValue.split("/").pop();
  const explicitlyUploads = /(^|\/)uploads\//i.test(cleanValue) || /\/uploads\//i.test(cleanValue);
  // Timeline images entered through CMS must resolve to public/uploads, even if
  // their filename happens to match an older src/assets image.
  if (!preferUploads && !explicitlyUploads && !cleanValue.includes("/" ) && legacyAssets[fileName]) {
    return legacyAssets[fileName];
  }

  const publicBase = process.env.PUBLIC_URL || "";
  let path = value.replace(/^\.\//, "");
  path = path.replace(/^public\//, "");
  path = path.replace(/^\/?my-portfolio\//, "");
  path = path.replace(/^\//, "");

  // Old values such as "tour-box.webp" are treated as public/uploads files,
  // while explicitly stored /assets/... paths keep their original location.
  if (!path.startsWith("uploads/") && !path.startsWith("assets/")) {
    path = `uploads/${path}`;
  }

  return `${publicBase}/${path}`.replace(/([^:]\/)\/+/, "$1");
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

  const projectId = preview.replace(/^preview-/, "").trim();
  const projectItem = findProject(projectId);
  const project = projectItem ? getProjectData(projectItem) : null;
  const deviceType = project?.deviceType || "mobile";
  const selectedTimelineImage =
    timelinePreview && normalizeId(timelinePreview.projectId) === normalizeId(project?.id)
      ? resolveImageSrc(timelinePreview.image, { preferUploads: true })
      : "";
  const projectPreviewImage = resolveImageSrc(project?.previewAsset);
  const imageSrc = selectedTimelineImage || projectPreviewImage;

  if (imageSrc) {
    return (
      <div className="preview-box dynamic" data-device={deviceType}>
        <div className="media-layout-container" style={{ objectFit: "cover", width: "100%" }}>
          <img
            src={imageSrc}
            alt={timelinePreview?.label || project?.title || "Превью проекта"}
            className="preview-img-asset"
            style={{ objectFit: "cover", width: "100%" }}
            onError={(event) => {
              // Keep the layout intact and expose a useful console error instead
              // of silently hiding the image and breaking the preview styling.
              console.error("Не удалось загрузить изображение превью:", imageSrc);
              event.currentTarget.dataset.loadError = "true";
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="preview-box map-style" data-device={deviceType}>
      <div className="static-map-placeholder">
        🪐 [МАКЕТ ВЕРСТКИ ГОТОВИТСЯ]
        <p>Вы выбрали кейс «{project?.title || "Проект"}».</p>
      </div>
    </div>
  );
}

export default ContentPreview;
