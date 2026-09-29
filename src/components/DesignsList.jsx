import React from 'react';
import projectsData from '../data/projectsData.json';
import './DesignsList.scss';

function DesignsList() {

  const list = projectsData.items || [];

  return (
    <div className="designs-list-page">
      
      {/* ВЕРХНЯЯ ШАПКА: СТАБИЛЬНЫЙ ОРИГИНАЛЬНЫЙ КОНТУР */}
      <section className="list-header-block">
        <div className='list-header-container'>
          <div className='list-header-content'>
            <span className="list-header-tag">PORTFOLIO // DIRECTORY</span>
            
            <div className="title-with-drops">
              <span className="drop-icon left-drop"></span>
              <h1 className="list-main-title">選ばれたプロジェクト</h1>
              <span className="drop-icon right-drop"></span>
            </div>

            <div className='content-bottom'>
              <h3 className="list-lead-text">デジタルプロダクト、ゲームシステム、UI/UXの制作実績です。</h3>
              <p className="list-header-desc">
                アイデアから実装まで、様々なプロジェクトに取り組んできました。
              </p>
            </div>

          </div>

          {/* 🔥 ИЗОЛИРОВАННЫЙ БЛОК ТЕКСТА И СТРЕЛКИ (ПЕРЕНЕСЕН ПО ТВОЕМУ МАРКЕРУ) */}
          <div className="list-handwritten-wrap">
            <p className="subtitle-text">Projects <br/> I've worked on</p>
            <div className="handwritten-arrow-vector"><span></span></div> 
          </div>

        </div>
      </section>
      
      {/* ТРЁХКОЛОНОЧНАЯ СЕТКА КАРТОЧЕК */}
      <section className="blocks-grid">
        {list.map((item, index) => {
          const data = item.fields ? item.fields : item;
          
          const projectColor =
            Array.isArray(data.colors) && data.colors.length > 0
              ? (typeof data.colors[0] === 'string'
                  ? data.colors[0]
                  : data.colors[0]?.colorCode || '#222529')
              : '#222529';

          const titleText = data.title && data.title !== '-' ? data.title : `Проект #${index + 1}`;
          // 🔥 ЖЕЛЕЗОБЕТОННЫЙ ФИКС: Забираем строго первый хекс из массива строк JSON
          const colorText = projectColor;
          
          const projectId = data.id || `project-${index}`;
          const formattedIndex = String(index + 1).padStart(2, '0');

          return (
            <a
              key={projectId}
              href={`#/design/${encodeURIComponent(projectId)}`}
              className="proto-block"
              style={{ '--project-accent': projectColor }}
            >
              <div className="card-top-row">
                <span className="card-number">{formattedIndex} —</span>
              </div>

              <div className="card-body">
                <h3 className="card-title" style={{ color: colorText }}>{titleText}</h3>
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

            </a>
          );
        })}
      </section>

    </div>
  );
}

export default DesignsList;
