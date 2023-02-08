import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { filterByDuration, filterByQuery } from "../../../utils/utils";

const SavedMovies = () => {
  const { currentUser, userMovies } = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState(false);
  const [initialMovies, setInitialMovies] = useState(userMovies);

  const isNotFound = initialMovies.length === 0;

  useEffect(()=>{
    setInitialMovies( userMovies );
  }, [userMovies.length, currentUser]);
  
  function submitSearchQuery(query){
    const moviesList = filterByQuery(userMovies, query);
    setInitialMovies(moviesList);
  }
  
  function onChangeFilter(){
    setFilter(!isFilter)
  };  


  return (
    <main className="saved-movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
        <MoviesCardList movies = {isFilter? filterByDuration(initialMovies) : initialMovies }/>
      {isNotFound&&<p>Ничего не найдено</p>}
    </main>
  );
}

export default SavedMovies;
