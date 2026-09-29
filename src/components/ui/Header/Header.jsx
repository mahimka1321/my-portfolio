import React from "react";
import "./Header.scss";

function Header({ currentPage, onTabChange, onLogoClick }) {
  return (
    <header className="site-header">
      <a
        className="logo"
        href="#/home"
        onClick={(event) => {
          if (window.location.hash === "#/home" || window.location.hash === "") {
            event.preventDefault();
            onLogoClick();
          }
        }}
        aria-label="ホームへ戻る"
      >
        <span aria-hidden="true" />
        マヒンカ
      </a>

      <nav className="navigation" aria-label="メインナビゲーション">
        <button
          type="button"
          className={currentPage === "designs" ? "active" : ""}
          onClick={() => onTabChange("designs")}
          aria-current={currentPage === "designs" ? "page" : undefined}
        >
          デザイン
        </button>
        <button
          type="button"
          className={currentPage === "skills" ? "active" : ""}
          onClick={() => onTabChange("skills")}
          aria-current={currentPage === "skills" ? "page" : undefined}
        >
          スキル
        </button>
      </nav>
    </header>
  );
}

export default Header;
