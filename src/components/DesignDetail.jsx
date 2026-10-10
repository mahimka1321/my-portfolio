import React, { useEffect, useMemo, useState } from "react";
import projectsData from "../data/projectsData.json";
import "./DesignDetail.scss";

const normalizeId = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();
const getProjectData = (item) => item?.fields || item || {};

const getImagePath = (step) => step?.image || step?.img || step?.imageUrl || "";

const normalizeImagePath = (asset) => {
  if (!asset || typeof asset !== "string") return "";
  const value = asset.trim();
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  const publicBase = process.env.PUBLIC_URL || "";
  let path = value.replace(/^\.\//, "").replace(/^public\//, "");
  path = path.replace(/^\/?my-portfolio\//, "").replace(/^\//, "");
  if (!path.startsWith("uploads/") && !path.startsWith("assets/"))
    path = `uploads/${path}`;
  return `${publicBase}/${path}`.replace(/([^:]\/)\/+/, "$1");
};

const publishPreview = (projectId, step) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("project-timeline-preview", {
      detail: {
        projectId,
        image: normalizeImagePath(getImagePath(step)),
        label: step?.label || "",
      },
    }),
  );
};

function DesignDetail({ id, onBack }) {
  const [activeStepId, setActiveStepId] = useState("");
  const [activeSubStepId, setActiveSubStepId] = useState("");

  const items = Array.isArray(projectsData.items) ? projectsData.items : [];
  const currentItem = items.find(
    (item) => normalizeId(getProjectData(item).id) === normalizeId(id),
  );
  const current = currentItem ? getProjectData(currentItem) : null;

  const timelineSteps = useMemo(() => {
    if (!Array.isArray(current?.timelineSteps)) return [];
    return current.timelineSteps;
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const firstStep = timelineSteps[0];
    setActiveStepId((previous) =>
      timelineSteps.some((step) => step.id === previous)
        ? previous
        : firstStep?.id || "",
    );
    const firstSubStep = firstStep?.subSteps?.[0];
    setActiveSubStepId((previous) => firstSubStep?.id || previous || "");
  }, [current?.id, timelineSteps]);

  const activeStep =
    timelineSteps.find((step) => step.id === activeStepId) || timelineSteps[0];
  const activeSubStep = activeStep?.subSteps?.find(
    (step) => step.id === activeSubStepId,
  );
  const selectedPreviewStep = activeSubStep || activeStep;

  useEffect(() => {
    if (!current || !selectedPreviewStep) return;
    publishPreview(current.id, selectedPreviewStep);
  }, [current?.id, selectedPreviewStep]);

  if (!current) {
    return (
      <div className="design-detail-page">
        <h2>Проект не найден в базе данных</h2>
        <button className="back-btn" onClick={onBack}>
          ⟵ КО ВСЕМ ДИЗАЙНАМ
        </button>
      </div>
    );
  }

  const primaryFont =
    current.fonts && current.fonts !== "-"
      ? String(current.fonts).trim()
      : "Montserrat";

  return (
    <div
      className="design-detail-page"
      style={{ "--chosen-font": primaryFont }}
    >
      <section className="case-top-section">
        <button className="back-btn" onClick={onBack}>
          ⟵ КО ВСЕМ ДИЗАЙНАМ
        </button>

        <div className="case-header-block">
          <span className="manifesto-tag">UI/UX ДИЗАЙН</span>
          <h1>
            {current.title || "БЕЗ НАЗВАНИЯ"}
            <br />
            <span className="invalig--rag-ps">
              <span />
              {current.subtitle || ""}
              <span />
            </span>
          </h1>
        </div>

        <div className="case-middle-block">
          <div className="desc-and-pills">
            <p className="case-description">{current.description || ""}</p>
            <div className="pills-row">
              {(Array.isArray(current.tags) ? current.tags : []).map(
                (tag, index) => (
                  <span
                    key={`${typeof tag === "string" ? tag : tag.tag}-${index}`}
                    className="pill-item"
                  >
                    {typeof tag === "string" ? tag : tag.tag}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="interactive-column">
            <div className="btn-about">
              <span>О ПРОЕКТЕ</span>
              <span>➔</span>
            </div>
            <div className="timeline-progress">
              {timelineSteps.map((step) => {
                const isStepActive = activeStep?.id === step.id;
                const hasSubSteps =
                  Array.isArray(step.subSteps) && step.subSteps.length > 0;

                return (
                  <div
                    key={step.id}
                    className={`step ${isStepActive ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="step-main-click"
                      onClick={() => {
                        setActiveStepId(step.id);
                        setActiveSubStepId(step.subSteps?.[0]?.id || "");
                        publishPreview(current.id, step.subSteps?.[0] || step);
                      }}
                    >
                      <span className={`dot ${isStepActive ? "active" : ""}`} />

                      <span
                        className={[
                          "step-label",
                          isStepActive ? "text-active" : "",
                          isStepActive && hasSubSteps
                            ? "step-label-with-substeps"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {step.label}
                      </span>
                    </button>

                    {hasSubSteps && isStepActive && (
                      <div className="container-for-hidden-text">
                        {step.subSteps.map((subStep) => {
                          const isSubActive = activeSubStep?.id === subStep.id;

                          return (
                            <button
                              type="button"
                              key={subStep.id}
                              className={`step sub-step-item ${
                                isSubActive ? "active" : ""
                              }`}
                              onClick={() => {
                                setActiveSubStepId(subStep.id);
                                publishPreview(current.id, subStep);
                              }}
                            >
                              <span
                                className={`dot ${isSubActive ? "active" : ""}`}
                              />

                              <span
                                className={isSubActive ? "text-active" : ""}
                              >
                                {subStep.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="case-bottom-section">
        <div className="info-column">
          <h4>ЗАДАЧА</h4>
          <p>{current.task || "—"}</p>
        </div>
        <div className="info-column">
          <h4>РЕЗУЛЬТАТ</h4>
          <div className="results-list">
            {(Array.isArray(current.results) ? current.results : []).map(
              (result, index) => (
                <div key={index} className="result-item">
                  <span className="text">
                    {typeof result === "string" ? result : result.result}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="info-column">
          <div>
            <h4>ЦВЕТА</h4>
            <div className="colors-row">
              {(Array.isArray(current.colors) ? current.colors : []).map(
                (color, index) => {
                  const value =
                    typeof color === "string"
                      ? color
                      : color.colorCode ||
                        color.color ||
                        color.value ||
                        "#222529";
                  return (
                    <div
                      key={`${value}-${index}`}
                      className="color-circle"
                      style={{ backgroundColor: value }}
                    />
                  );
                },
              )}
            </div>
          </div>
          <div>
            <h4 className="info-fonts">ШРИФТЫ</h4>
            <h3 className="font-primary">{primaryFont}</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DesignDetail;
