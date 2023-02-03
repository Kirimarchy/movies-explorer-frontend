import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import { useContext } from "react";
import CurrentUserContext from  "../../../utils/context/CurrentUserContext";

const Movies = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="movies">
      <SearchForm/>
      <hr className="movies-separator"/>
      <MoviesCardList/>
    </main>
  );
}

export default Movies;
