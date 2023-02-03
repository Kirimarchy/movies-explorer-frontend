import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import { MOVIES_URL } from '../../../../utils/constants';


const MoviesCard = ({movie}) => {

  const location = useLocation();
  const saved = false;

  function saveMovie() {
  
  }

  function deleteMovie() {
 
  }

    return (
      <li className="movies-card">
        <article className="movies-card__item">

          <a target="_blank" rel="noreferrer" href={movie?.trailerLink}>
            <img
              src={`${MOVIES_URL}${movie?.image.formats.thumbnail.url}`}
              alt={movie?.nameRU}
              title={`Описание: ${movie?.description} \n\nСнято: ${movie?.country}, ${movie?.year}г.`}
              className="movies-card__poster"
            />
            {location.pathname === '/movies' && (
              <button
                type="button"
                className={`movies-card__button movies-card__button_type_${ saved ? 'saved' : 'unsaved'
                }`}
                aria-label={`${
                  saved ? 'Удалить фильм' : 'Добавить в коллекцию'
                }`}
                title={`${
                  saved ? 'Удалить фильм' : 'Добавить в коллекцию'
                }`}
                onClick={saved? deleteMovie : saveMovie}
              ></button>
            )}

            {location.pathname === '/saved-movies' && (
              <button
                type="button"
                className="movies-card__button movies-card__button_type_delete"
                aria-label="Удалить фильм"
                title="Удалить фильм"
                onClick={deleteMovie}
              ></button>
            )}
          </a>
          <div className="movies-card__description">
            <h2 className="movies-card__title">{movie?.title}</h2>
            <span className="movies-card__duration">
              {movie?.duration}
            </span>
          </div>

        </article>
      </li>
    );
}



export default MoviesCard;
