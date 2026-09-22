import React from 'react';

// 1. Вспомогательный компонент: Список всех дизайнов
function DesignsList({ onSelect }) {
  const list = [
    { id: 'tea', name: '🍵 Японский Чай (Дзен-минимализм)', color: '#4E6E58' },
    { id: 'hankoya', name: '🔲 Редизайн Hankoya (Фибоначчи)', color: '#D97D3A' },
    { id: 'terraria', name: '👾 Мод для Terraria (Пиксель-арт)', color: '#3A7BD5' }
  ];

  return (
    <div className="designs-list-page">
      <h2>Мои проекты и дизайны</h2>
      <p>Выберите кейс, чтобы изучить его архитектуру смыслов:</p>
      
      <div className="blocks-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {list.map((item) => (
          <div 
            key={item.id}
            className="proto-block"
            style={{ 
              backgroundColor: item.color, 
              padding: '25px', 
              borderRadius: '8px', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
            onClick={() => onSelect(item.id)} // Клик открывает кейс
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Вспомогательный компонент: Объяснение конкретного выбранного дизайна
function DesignDetail({ id, onBack }) {
  const details = {
    tea: { 
      title: 'Японский Чай', 
      task: 'Передать атмосферу умиротворения и дзен через цифровой интерфейс, избегая токийского визуального хаоса.', 
      result: 'Использована палитра традиционных матовых цветов, много воздуха и вертикальное написание каллиграфических иероглифов.' 
    },
    hankoya: { 
      title: 'Редизайн Hankoya', 
      task: 'Укротить перегруженный e-commerce контент крупнейшего магазина печатей, сохранив 100% важной информации.', 
      result: 'Проектирование информационной архитектуры по принципу мозаики и 2D-скролла вдоль золотой спирали Фибоначчи.' 
    },
    terraria: { 
      title: 'Мод для Terraria', 
      task: 'Создать технически стабильный игровой контент и интегрировать его в существующую экосистему игры.', 
      result: 'Самостоятельно отрисован пиксель-арт (спрайты) и прописана логика поведения хитбоксов и анимаций.' 
    }
  };

  const current = details[id] || { title: 'Проект', task: '-', result: '-' };

  return (
    <div className="design-detail-page">
      {/* Кнопка "Назад" сбросит стейт */}
      <button 
        className="back-btn" 
        onClick={onBack}
        style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
      >
        ← Назад к проектам
      </button>
      
      <div className="case-study-content">
        <h2>Проект: {current.title}</h2>
        <div className="info-block" style={{ marginBottom: '20px', marginTop: '20px' }}>
          <h3>ЗАДАЧА</h3>
          <p>{current.task}</p>
        </div>
        <div className="info-block">
          <h3>РЕЗУЛЬТАТ</h3>
          <p>{current.result}</p>
        </div>
      </div>
    </div>
  );
}

// 3. Корневой менеджер левого контента (Твой основной компонент)
function Content({ page, selectedDesign, setSelectedDesign, setCurrentPreview }) {
  
  // Функция выбора дизайна
  const handleSelectDesign = (id) => {
    setSelectedDesign(id);
    setCurrentPreview(`preview-${id}`); 
  };

  // Функция возврата назад к списку
  const handleBackToList = () => {
    setSelectedDesign(null);
    setCurrentPreview('map'); 
  };

  switch (page) {
    case 'home':
      return (
        <div className="home-page">
          <h1>ПРОЕКТИРУЮ СИСТЕМЫ. УПРАВЛЯЮ ХАОСОМ.</h1>
          <p>Это главная страница портфолио Максима. Справа отображается статическая карта архитектуры.</p>
        </div>
      );
      
    case 'designs':
      // Теперь и DesignsList, и DesignDetail объявлены выше в этом же файле!
      return selectedDesign === null ? (
        <DesignsList onSelect={handleSelectDesign} />
      ) : (
        <DesignDetail id={selectedDesign} onBack={handleBackToList} />
      );

    case 'skills':
      return <div className="skills-page"><h2>Мои навыки и технологии</h2></div>;

    default:
      return <div>Страница не найдена</div>;
  }
}

export default Content;
