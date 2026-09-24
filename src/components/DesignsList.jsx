import React from 'react';
import projectsData from '../data/projectsData.json';
import './DesignsList.scss';

function DesignsList({ onSelect }) {
  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      
      {/* ВЕРХНЯЯ ШАПКА: СТАБИЛЬНЫЙ ОРИГИНАЛЬНЫЙ КОНТУР */}
      <div className="list-header-block">
        <span className="list-header-tag">PORTFOLIO // DIRECTORY</span>
        
        <div className="title-with-drops">
          <span className="drop-icon left-drop"></span>
          <h1 className="list-main-title">選ばれたプロジェクト</h1>
          <span className="drop-icon right-drop"></span>
        </div>

        {/* 🔥 ИЗОЛИРОВАННЫЙ БЛОК ТЕКСТА И СТРЕЛКИ (ПЕРЕНЕСЕН ПО ТВОЕМУ МАРКЕРУ) */}
        <div className="list-handwritten-wrap">
          <p className="subtitle-text">Projects <br/> I've worked on</p>
          <div className="handwritten-arrow-vector"></div> 
        </div>

        <h3 className="list-lead-text">デジタルプロダクト、ゲームシステム、UI/UXの制作実績です。</h3>
        <p className="list-header-desc">
          アイデアから実装まで、様々なプロジェクトに取り組んできました。
        </p>
      </div>
      
      {/* ТРЁХКОЛОНОЧНАЯ СЕТКА КАРТОЧЕК */}
      <div className="blocks-grid">
        {list.map((item, index) => {
          const data = item.fields ? item.fields : item;
          
          let projectColor = '#222529';
          if (data.colors && Array.isArray(data.colors) && data.colors.length > 0) {
            const firstObj = data.colors;
            projectColor = firstObj.colorCode ? firstObj.colorCode : (typeof firstObj === 'string' ? firstObj : '#222529');
          }

          const titleText = data.title && data.title !== '-' ? data.title : `Проект #${index + 1}`;
          const projectId = data.id || `project-${index}`;
          const formattedIndex = String(index + 1).padStart(2, '0');

          return (
            <div 
              key={projectId}
              className="proto-block"
              style={{ '--project-accent': projectColor }}
              onClick={() => onSelect(projectId)}
            >
              <div className="card-top-row">
                <span className="card-number">{formattedIndex} —</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{titleText}</h3>
                <p className="card-desc">
                  {data.description && data.description !== '-' 
                    ? data.description 
                    : 'ユーザー体験を重視したインターフェース設計・プロトタイプ制作を行いました。'}
                </p>
              </div>

              <div className="card-footer-row">
                <div className="card-tags-group">
                  {data.tags && Array.isArray(data.tags) ? (
                    data.tags.slice(0, 2).map((t, i) => (
                      <span key={i} className="card-pill-tag">{t.tag ? t.tag : t}</span>
                    ))
                  ) : (
                    <>
                      <span className="card-pill-tag">UI/UX</span>
                      <span className="card-pill-tag">FIGMA</span>
                    </>
                  )}
                </div>
                <div className="card-arrow-btn">➔</div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default DesignsList;
