import "./MoviesCardList.css";
import React, { useContext, useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../../hooks/useResize"
import { DISPLAY_RULES } from "../../../../utils/constants";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({movies}) => {
  const location = useLocation();
  const {mobile, tablet, desktop} = DISPLAY_RULES;
  const {isMobile, isTablet, isDesktop} = useResize();
  const [isRendered, setIsRendered] = useState(true);
  const [displayMethod, setDisplayMethod] = useState({ total: 12, more: 3 });
  const [moviesList, setMoviesList]=useState(movies);
  const [isMoreButton, setIsMoreButton] = useState(true);
  
  useEffect(()=>{
    location.pathname==='/movies' && moviesList.length >= displayMethod.total && moviesList.length < movies.length ? 
    setIsMoreButton(true) : setIsMoreButton(false)
  }, [moviesList, displayMethod, isRendered])
 
  useEffect(() => {
    if (location.pathname==='/movies'){
      if (isDesktop){
        setDisplayMethod(desktop);
      }
      if (isTablet){
        setDisplayMethod(tablet);
      };
      if (isMobile){
        setDisplayMethod(mobile);
      }
    } 
    return () => setIsRendered(false)    
  }, [isMobile, isTablet, isDesktop, isRendered, location]);

  useEffect(() => {
      if (location.pathname==='/movies') {
        if (movies.length) {
        const shown = movies.filter((item, i) => i < displayMethod.total);
        setMoviesList(shown);
        }
      } else setMoviesList(movies);
      
  }, [movies, displayMethod]);

    
  const handleShowMore = () => {
    const start = moviesList.length;
    const end = start + displayMethod.more;
    const rest = end - start;

    if (rest > 0) {
      const newCards = movies.slice(start, end);
      setMoviesList([...moviesList, ...newCards]);
    }
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesList.map(movie => (
          <MoviesCard 
            movie={movie}
          />
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
