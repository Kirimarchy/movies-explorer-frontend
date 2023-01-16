import React from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

const MoviesCard = () => {

  const location = useLocation();
  const saved = true;

    return (
      <li className="movies-card">
        <article className="movies-card__item">
          <a target="_blank" rel="noreferrer" href={movie?.trailerLink}>
            <img
              src={movie?.image}
              alt={movie?.nameRU}
              title={`Описание: ${movie?.description} \n\nСнято: ${movie?.country} ${movie?.year}г.`}
              className="movies-card__poster"
            />
          </a>
          <div className="movies-card__description">
            <h2 className="movies-card__title">{movie?.nameRU}</h2>

              <button
                type="button"
                className={`movies-card__button movies-card__button_type_${
                  saved ? 'saved' : 'save'
                }`}
                aria-label={`${
                  saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
                }`}
                title={`${
                  saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
                }`}
              ></button>

            {location.pathname === '/saved-movies' && (
              <button
                type="button"
                className="movies-card__button movies-card__button_type_unsave"
                aria-label="Удалить фильм из сохранённых"
                title="Удалить фильм из сохранённых"
              ></button>
            )}
          </div>
          <span className="movies-card__duration">
          {(movie?.duration)}
        </span>
        </article>
      </li>
    );
}



export default MoviesCard;
