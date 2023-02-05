import "./MoviesCardList.css";
import React, { useContext, useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../../hooks/useResize"
import { checkSavedMovie, filterUnified } from "../../../../utils/utils";
import { drawCardsOnDevices } from "../../../../utils/constants";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../../../../utils/context/CurrentUserContext";

const MoviesCardList = ({movies, savedMovies, filter, handleCardAction}) => {
  const location = useLocation();
  const {currentUser} = useContext(CurrentUserContext);
  const {mobile, tablet, desktop} = drawCardsOnDevices;
  const {isMobile, isTablet, isDesktop} = useResize();
  const [displayMethod, setDisplayMethod] = useState({ total: 12, more: 3 });
  const [cachedMovies, setCachedMovies ] = useState(movies)
  const [filteredMovies, setFilteredMovies] = useState(filterUnified(movies));
  const [moviesList, setMoviesList]=useState([]);
  const isMoreButton = location.pathname==='movies' && moviesList.length >= 0 && moviesList.length < movies.length;
  // const cachedMovies = JSON.parse(localStorage.getItem(`${currentUser.email}|all_movies`));
  console.log('CACHED', cachedMovies);
  const unfilteredMovies = location.pathname==='/movies' ? cachedMovies : savedMovies;

  useEffect(() => {setMoviesList(filterUnified(unfilteredMovies,filter))}, []);
  
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
        {moviesList.map(movie => (
          <MoviesCard 
            movie={movie} 
            isSaved={checkSavedMovie( savedMovies, movie )} 
            onCardAction = {handleCardAction}
          />
        ))}
        {/* {location.pathname==='/saved-movies'&&
        savedMovies.map(movie => (
          <MoviesCard 
            movie={movie} 
            isSaved={true} 
            onCardAction = {handleCardAction}
          />
        ))} */}
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
