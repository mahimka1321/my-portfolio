import React from "react";
import './Button.scss';

function Button ({text, variant = 'default', onClick, href}) {
    const buttonClass = `brutal-btn btn-${variant}`;
    if (href) {
      return (
        <a href={href} className={buttonClass}>
          <span>{text}</span>
          <span className="btn-arrow">➔</span>
        </a>
      );
    }
    
    return (
      <button type="button" className={buttonClass} onClick={onClick}>
        <span>{text}</span>
        <span className="btn-arrow">➔</span>
      </button>
    );
}
export default Button;