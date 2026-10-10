import React, { useEffect, useRef, useState } from "react";
import projectsData from "../data/projectsData.json";
import { Svg, hasSvg } from "./ui/Svg/Svg";

import "./ContentPreview.scss";

const rasterPreviews = {

};

const findProject = (id) => {
  return (projectsData.items || []).find((item) => {
    const data = item.fields || item;
    return (
      String(data.id).trim().toLowerCase() === String(id).trim().toLowerCase()
    );
  });
};

function PreviewImage({ src, alt }) {
  const [imageStatus, setImageStatus] = useState({ src: "", loaded: false, failed: false });
  const loaded = imageStatus.src === src && imageStatus.loaded;
  const failed = imageStatus.src === src && imageStatus.failed;

  return (
    <div
    style={{ objectFit: "cover", width: "100%"}}
     className={`preview-image-frame${loaded ? " is-loaded" : " is-loading"}`}>
      {!loaded && !failed && (
        <div className="preview-image-loader" role="status" aria-label="Загрузка изображения">
          <span className="preview-spinner" />
          <span>Загружаем макет…</span>
        </div>
      )}
      {failed && (
        <div className="preview-image-loader preview-image-error" role="status">
          Не удалось загрузить изображение
        </div>
      )}
      <img
        key={src}
        src={src}
        alt={alt}
        className="preview-img-asset"
        onLoad={() => setImageStatus({ src, loaded: true, failed: false })}
        onError={() => setImageStatus({ src, loaded: false, failed: true })}
        style={{ objectFit: "cover", width: "100%", opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

function ContentPreview({ preview }) {
  const [timelinePreview, setTimelinePreview] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const handleTimelinePreview = (event) => setTimelinePreview(event.detail || null);
    window.addEventListener("project-timeline-preview", handleTimelinePreview);
    return () => window.removeEventListener("project-timeline-preview", handleTimelinePreview);
  }, []);

  const projectId = preview ? preview.replace(/^preview-/, "").trim() : "";
  const projectItem = projectId ? findProject(projectId) : null;
  const project = projectItem ? projectItem.fields || projectItem : null;
  const deviceType = project?.deviceType || "mobile";
  const fileName = project?.previewAsset?.trim().split("/").pop();
  const activeTimelineImage =
  timelinePreview &&
  project &&
  String(timelinePreview.projectId) === String(project.id)
    ? timelinePreview.image || ""
    : "";

  // Each newly selected project/branch starts at the top of its preview.
  useEffect(() => {
    if (previewRef.current) previewRef.current.scrollTop = 0;
  }, [preview, activeTimelineImage, timelinePreview?.label]);

  if (preview === "map" || !preview) {
    return (
      <div ref={previewRef} className="preview-box map-style" data-device="mobile">
        <Svg id="main-architecture-map" />
      </div>
    );
  }

  if (activeTimelineImage) {
    return (
      <div ref={previewRef} className="preview-box dynamic" data-device={deviceType}>
        <div className="media-layout-container">
          <PreviewImage
            src={activeTimelineImage}
            alt={timelinePreview?.label || project?.title || "Превью этапа проекта"}
          />
        </div>
      </div>
    );
  }

  if (project && fileName) {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (["webp", "png", "jpg", "jpeg"].includes(fileExtension)) {
      const imageSrc = rasterPreviews[fileName];

      if (imageSrc) {
        return (
          <div ref={previewRef} className="preview-box dynamic" data-device={deviceType}>
            <div className="media-layout-container">
              <PreviewImage src={imageSrc} alt={project.title || "Design Preview"} />
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
          <div ref={previewRef} className="preview-box dynamic" data-device={deviceType}>
            <div className="svg-layout-container">
              <Svg id={svgId} />
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div ref={previewRef} className="preview-box map-style" data-device={deviceType}>
      <div className="static-map-placeholder" style={{marginTop:'50px'}}>
        <p>Вы выбрали кейс "{project?.title || "Проект"}".</p>
      </div>
    </div>
  );
}

export default ContentPreview;
