import React from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import picture from '../../../../images/movie_card_img.png';
const MoviesCard = (movie) => {

  const location = useLocation();
  const saved = true;

    return (
      <li className="movies-card">
        <article className="movies-card__item">

          <a target="_blank" rel="noreferrer" href={movie?.trailerLink}>
            <img
              src={picture}
              alt={'Изображение заставки фильма'}
              title={`Описание: Гуляем на всю зарплату \n\nСнято: Россия, 2022г.`}
              className="movies-card__poster"
            />
            {location.pathname === '/movies' && (
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
            )}

            {location.pathname === '/saved-movies' && (
              <button
                type="button"
                className="movies-card__button movies-card__button_type_unsave"
                aria-label="Удалить фильм из сохранённых"
                title="Удалить фильм из сохранённых"
              ></button>
            )}
          </a>
          <div className="movies-card__description">
            <h2 className="movies-card__title">Дискотека века</h2>
            <span className="movies-card__duration">
              {("2ч22м")}
            </span>
          </div>

        </article>
      </li>
    );
}



export default MoviesCard;
