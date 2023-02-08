import './MoviesCard.css';
import { useLocation } from "react-router-dom";
import { recountDuration, checkSavedMovie } from '../../../../utils/utils';
import { MainApi } from '../../../../utils/api/MainApi';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../../../utils/context/CurrentUserContext';

const MoviesCard = ({movie}) => {
  const location = useLocation();
  const { userMovies, setUserMovies } = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(checkSavedMovie(userMovies, movie));


  function saveMovie() {
    const newMoviesList = [...userMovies, movie];
    MainApi.saveMovie(movie)
    .then( res => {if (res._id) {
      movie._id = res._id;
      setUserMovies(newMoviesList);
      setIsSaved(true);
    }})
  }

  function deleteMovie() {
    const newMoviesList = userMovies.filter(item => movie._id !== item._id);
    MainApi.deleteMovie(movie)
    .then( res => { if (res._id) {
      setUserMovies(newMoviesList);
      setIsSaved(false);
    }})
  }
  

    return (
      <li className="movies-card">
        <article className="movies-card__item">

          <a target="_blank" rel="noreferrer" href={movie?.trailerLink}>
            <img
              src={movie?.image}
              alt={movie?.nameRU}
              title={`${movie?.nameEN}\n\nОписание: ${movie?.description} \n\nСнято: ${movie?.country}, ${movie?.year}г.`}
              onClick = {e => e.stopPropagation()}
              className="movies-card__poster"
            />
          </a>
            {location.pathname === '/movies' && (
              <button
                type="button"
                className={`movies-card__button movies-card__button_type_${ isSaved ? 'saved' : 'unsaved'
                }`}
                aria-label={`${
                  isSaved ? 'Удалить фильм' : 'Добавить в коллекцию'
                }`}
                title={`${
                  isSaved ? 'Удалить фильм' : 'Добавить в коллекцию'
                }`}
                onClick={isSaved ? deleteMovie : saveMovie}
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
