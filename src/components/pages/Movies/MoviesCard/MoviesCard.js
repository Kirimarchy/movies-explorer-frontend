import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import { recountDuration } from '../../../../utils/utils';
import { MainApi } from '../../../../utils/api/MainApi';


const MoviesCard = ({movie}) => {

  const location = useLocation();
  const saved = false;

  function saveMovie(e) {
    MainApi.saveMovie(movie);
    console.log('click');
 
  }

  function deleteMovie(e) {
    e.stopPropagation();
    MainApi.deleteMovie(movie);
  }

    return (
      <li className="movies-card">
        <article className="movies-card__item">

          <a target="_blank" rel="noreferrer" href={movie?.trailerLink}>
            <img
              src={movie?.image}
              alt={movie?.nameRU}
              title={`Описание: ${movie?.description} \n\nСнято: ${movie?.country}, ${movie?.year}г.`}
              onClick = {e => e.stopPropagation()}
              className="movies-card__poster"
            />
          </a>
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
          
          <div className="movies-card__description">
            <h2 className="movies-card__title">{movie?.nameRU}</h2>
            <span className="movies-card__duration">
              {recountDuration(movie?.duration)}
            </span>
          </div>

        </article>
      </li>
    );
}



export default MoviesCard;
