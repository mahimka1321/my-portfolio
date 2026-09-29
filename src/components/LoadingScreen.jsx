import React from "react";
import "./LoadingScreen.scss";

function LoadingScreen({ isLoading = true }) {
  return (
    <div
      className={`loading-screen ${!isLoading ? "loading-screen--hidden" : ""}`}
      aria-hidden={!isLoading}
    >
      <div className="loading-screen__spinner-wrap">
        <div className="loading-screen__spinner" />
      </div>
      <span className="loading-screen__text">SYSTEM INITIALIZATION</span>
    </div>
  );
}

export default LoadingScreen;
