import './NotFound.css';
import {useNavigate} from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <main className="not-found">
      <p className="not-found__text-container">
        <span className="not-found__error">404</span>
        <span className="not-found__error-name">Страница не найдена</span>
      </p>
      <button className="not-found__button" onClick={()=>navigate(-1)}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
