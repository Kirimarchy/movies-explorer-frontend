import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import { MainApi } from "../../../utils/api/MainApi";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { correctApiData } from "../../../utils/utils";

const Movies = ({movies, savedMovies}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState({query:'', isShort: false});
  
  const handleQuery = ( query, isShort ) => {
    setFilter({query, isShort});
  }

  const updateCards = () => {

  }

  useEffect(()=>{
    localStorage.setItem(`${currentUser.email}|search_query`, isFilter.query);
    localStorage.setItem(`${currentUser.email}|short_filter`, isFilter.isShort);
    localStorage.setItem(`${currentUser.email}|all_movies`,   moviesFetched);
  }, [isFilter, moviesFetched]);

  return (
    <main className="movies">
      <SearchForm handleSearch={handleQuery}/>
      <hr className="movies-separator"/>
      <MoviesCardList 
        movies = {[]} 
        savedMovies = {savedMoviesFetched} 
        filter = {isFilter}
        handleCardAction = {updateCards}
        />
    </main>
  );
}

export default Movies;
