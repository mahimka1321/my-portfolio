import React from "react";
import Home from "./Home";
import DesignsList from "./DesignsList";
import DesignDetail from "./DesignDetail";
import Skills from "./Skills";

function Content({ page, selectedDesign }) {
  const handleBackToList = () => {
    window.location.hash = "#/designs";
  };

  switch (page) {
    case "home":
      return <Home />;

    case "designs":
      return selectedDesign === null ? (
        <DesignsList />
      ) : (
        <DesignDetail id={selectedDesign} onBack={handleBackToList} />
      );

    case "skills":
      return <Skills />;

    default:
      return (
        <div className="page-not-found">
          <h2>Страница не найдена</h2>
        </div>
      );
  }
}

export default Content;
