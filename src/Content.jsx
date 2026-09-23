import React from 'react';
import Home from './Home'; // Наш новый журнальный главный экран
import DesignsList from './components/DesignsList'; // Компонент сетки кнопок-проектов
import DesignDetail from './components/DesignDetail'; // Компонент журнального кейса
import Skills from './components/Skills'; // Компонент навыков и технологий

function Content({ page, setPage, selectedDesign, setSelectedDesign, setCurrentPreview }) {

  // Функция срабатывает, когда пользователь кликает по кнопке любого проекта
  const handleSelectDesign = (id) => {
    window.location.hash = `#/design/${id}`; // Безопасно меняем адресную строку браузера
  };

  // Функция срабатывает, когда пользователь нажимает кнопку "← Назад к проектам"
  const handleBackToList = () => {
    window.location.hash = '#/designs'; // Возвращаем адрес в список
  };

  // Главный диспетчер роутинга левой панели
  switch (page) {
    case 'home':
      return <Home />;
      
    case 'designs':
      // Если проект не выбран — показываем сетку кнопок, иначе — детальный кейс
      return selectedDesign === null ? (
        <DesignsList onSelect={handleSelectDesign} />
      ) : (
        <DesignDetail id={selectedDesign} onBack={handleBackToList} />
      );
      
    case 'skills':
      return <Skills />;
      
    default:
      return (
        <div style={{ padding: '30px', fontFamily: 'Nunito, sans-serif' }}>
          <h2>Страница не найдена</h2>
        </div>
      );
  }
}

export default Content;
