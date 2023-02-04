import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../../hooks/useResize"

const MoviesCardList = ({movies =[], filter}) => {
  // const [cardsVisible, setCardsVisible] = useState({ total: 12, more: 3 });
  // const {width, isMobile, isTablet, isDesktop} = useResize();
  useEffect(() => {}, [filter]);


  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map(movie => (
          <MoviesCard movie={movie} key={`_${movie.id}`}/>
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
