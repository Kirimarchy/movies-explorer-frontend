import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import cards from "./examplecards";
import { MoviesApi } from "../../../../utils/api/MoviesApi";
import correctApiData from "../../../../utils/utils";


const MoviesCardList = () => {

  const [moviesList, setMoviesList] = useState([]);

  useEffect(()=>{
      MoviesApi.getAllMovies().
        then((res) => {
          setMoviesList(correctApiData(res));
          console.log('!!!!!!!', moviesList);
        }).
        catch(err => console.log('Error', err));
  },[]);

  const location = useLocation();

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesList.map(movie => (
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
