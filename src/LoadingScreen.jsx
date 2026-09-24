import React from 'react';
import './LoadingScreen.scss';

function LoadingScreen({ isLoading }) {
  return (
    <div className={`loading-screen ${!isLoading ? 'loading-screen--hidden' : ''}`}>
      <div className="loading-screen__spinner-wrap">
        <div className="loading-screen__spinner"></div>
      </div>
      <span className="loading-screen__text">SYSTEM INITIALIZATION</span>
    </div>
  );
}

export default LoadingScreen;
