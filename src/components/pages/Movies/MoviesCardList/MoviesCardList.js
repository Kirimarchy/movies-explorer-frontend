import React from "react";
import "./MoviesCardList.css";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import cards from "./examplecards";


const MoviesCardList = () => {
  const moviesList = cards;
  const location = useLocation();

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesList.map(movie => (
          <MoviesCard
          />
        ))}
      </ul>

        <button
          className="movies-card-list__show-more"
        >
          Ещё
        </button>

    </section>
  );
}

export default MoviesCardList;
