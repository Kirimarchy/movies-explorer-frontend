import './MoviesCard.css';
import { useLocation } from "react-router-dom";
import { recountDuration } from '../../../../utils/utils';
import { MainApi } from '../../../../utils/api/MainApi';
import { useContext } from 'react';
import CurrentUserContext from '../../../../utils/context/CurrentUserContext';


const MoviesCard = ({ movie, isSaved, onCardAction}) => {

  const location = useLocation();
  const saved = isSaved;
  const {setUserMovies} = useContext(CurrentUserContext);

  function saveMovie() {
    MainApi.saveMovie(movie);
    onCardAction();
  }

  function deleteMovie() {
    MainApi.deleteMovie(movie);
    onCardAction();
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
