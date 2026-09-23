import React from 'react';

function Skills() {
  return (
    <div className="skills-page" style={{ padding: '30px', color: '#2B2B2B', fontFamily: 'Nunito, sans-serif' }}>
      <h2 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Мои навыки и технологии</h2>
      <p style={{ color: '#666' }}>Инженерный стек проектирования и разработки систем:</p>
      
      <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ borderLeft: '3px solid #D9A74A', paddingLeft: '15px' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>FRONTEND ARCHITECTURE</h3>
          <p style={{ margin: '0', color: '#555', fontSize: '14px' }}>React, JavaScript (ES6+), SCSS/SASS, SPA, Git-Based CMS Integration</p>
        </div>
        <div style={{ borderLeft: '3px solid #D9A74A', paddingLeft: '15px' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>UI / UX SYSTEMS</h3>
          <p style={{ margin: '0', color: '#555', fontSize: '14px' }}>Figma, Сплит-интерфейсы, Проектирование контуров и карт смыслов, Асимметричный журнальный минимализм</p>
        </div>
      </div>
    </div>
  );
}

export default Skills;
