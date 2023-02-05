import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../../hooks/useResize"
import { checkSavedMovie } from "../../../../utils/utils";
import { drawCardsOnDevices } from "../../../../utils/constants";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({movies, savedMovies, filter, handleCardAction}) => {
  const location = useLocation();
  const {mobile, tablet, desktop} = drawCardsOnDevices;
  const {isMobile, isTablet, isDesktop} = useResize();
  const [displayMethod, setDisplayMethod] = useState({ total: 12, more: 3 });
  const [moviesList, setMoviesList]=useState([]);
  const isMoreButton = moviesList.length >= 5 && moviesList.length < movies.length;
  
  useEffect(() => {}, [filter]);
  
  useEffect(() => {
      if (isDesktop){
        setDisplayMethod(desktop)
      };
      if (isTablet){
        setDisplayMethod(tablet)
      };
      if (isMobile){
        setDisplayMethod(mobile)
      };    
  }, [isMobile, isTablet, isDesktop]);

  
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < displayMethod.total);
      setMoviesList(res);
    }
  }, [moviesList, displayMethod]);
  
  const handleShowMore = () => {
    const start = moviesList.length;
    const end = start + displayMethod.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...moviesList, ...newCards]);
    }
  }



  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {location.pathname==='/movies'&&
        movies.map(movie => (
          <MoviesCard movie={movie} isSaved={checkSavedMovie( savedMovies, movie )} onCardAction = {handleCardAction}/>
        ))}
        {location.pathname==='/saved-movies'&&
        savedMovies.map(movie => (
          <MoviesCard movie={movie} isSaved={true} onCardAction = {handleCardAction}/>
        ))}
      </ul>
      {isMoreButton&&      
        <button
          className="movies-card-list__show-more"
          onClick={handleShowMore}
        >
          Ещё
        </button>
      }

    </section>
  );
}

export default MoviesCardList;
