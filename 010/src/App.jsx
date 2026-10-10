import React, { useCallback, useEffect, useState } from "react";
import Header from "./components/ui/Header/Header";
import Content from "./components/Content";
import ContentPreview from "./components/ContentPreview";
import "./index.scss";

const getRoute = () => {
  const hash = window.location.hash || "#/home";
  const normalized = hash.startsWith("#/") ? hash.slice(2) : hash.replace(/^#/, "");

  if (!normalized || normalized === "home") {
    return { page: "home", selectedDesign: null, preview: "map" };
  }

  if (normalized.startsWith("design/")) {
    const designId = decodeURIComponent(normalized.slice("design/".length)).trim();
    return {
      page: "designs",
      selectedDesign: designId || null,
      preview: designId ? `preview-${designId}` : "map",
    };
  }

  const page = normalized.split("/")[0];
  if (page === "designs" || page === "skills") {
    return { page, selectedDesign: null, preview: "map" };
  }

  return { page: "home", selectedDesign: null, preview: "map" };
};

function App() {
  const [route, setRoute] = useState(getRoute);

  const syncRoute = useCallback(() => {
    setRoute(getRoute());
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", syncRoute);

    let loaderTimeout;
    const hideGlobalLoader = () => {
      const loader = document.getElementById("global-preloader");
      if (!loader) return;

      loader.classList.add("preloader--hidden");
      loaderTimeout = window.setTimeout(() => loader.remove(), 400);
    };

    if (document.readyState === "complete") {
      loaderTimeout = window.setTimeout(hideGlobalLoader, 500);
    } else {
      window.addEventListener("load", hideGlobalLoader, { once: true });
    }

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("load", hideGlobalLoader);
      if (loaderTimeout) window.clearTimeout(loaderTimeout);
    };
  }, [syncRoute]);

  const handleLogoClick = () => {
    window.location.hash = "#/home";
  };

  const handleTabChange = (newPage) => {
    window.location.hash = `#/${newPage}`;
  };

  return (
    <div className="app-container">
      <div className="left-side-container">
        <Header
          currentPage={route.page}
          onTabChange={handleTabChange}
          onLogoClick={handleLogoClick}
        />
        <Content page={route.page} selectedDesign={route.selectedDesign} />
      </div>
      <ContentPreview preview={route.preview} />
    </div>
  );
}

export default App;
