import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
 
  return (
    <main className="not-found">
      <p className="not-found__text-container">
        <span className="not-found__error">404</span>
        <span className="not-found__error-name">Страница не найдена</span>
      </p>
      <button className="not-found__button" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
