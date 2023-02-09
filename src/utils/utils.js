import { COMPLETE_FIELDS, PRE_LINK, SHORT_DURATION_LIMIT } from "./constants";

export const correctApiData = (data) => {
    data.forEach(item => {
      if (!item.image) {
        item.image = COMPLETE_FIELDS.image;
        item.thumbnail = COMPLETE_FIELDS.thumbnail;
      } else {
        item.image = `${PRE_LINK}${item?.image?.url}`;
        item.thumbnail = `${PRE_LINK}${item?.image?.formats?.thumbnail.url}`;
      }
      if(!item.country) {
        item.country = 'Russia';
      }
      if(!item.nameEN) {
        item.nameEN = item.nameRU;
      }
    });
    return data;
}

export const recountDuration = (minutes) => {
  return minutes >= 60 ? `${(minutes-minutes%60)/60}ч ${minutes%60}м` : `${minutes}м`;
}

export const filterByQuery = (movies, query) => {
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  });
  return moviesByQuery;
}

export const filterByDuration = (movies) => {
  return movies.filter(movie => movie.duration < SHORT_DURATION_LIMIT);
}

export const filterUnified = (movies, query, filter) => {
   return filter? filterByDuration(filterByQuery(movies, query)) : filterByQuery(movies, query);
}

export const checkSavedMovie = (arr, movie) => {
  return arr.find((item) => {
    return item.movieId == (movie.id || movie.movieId) ;
  });
}

export const toLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
}

export const fromLocalStorage = (key) => {
  JSON.parse(localStorage.getItem(key));
}

export const getId = (movie, movies) => {
  movies.forEach(item => {
    if (item.movieId == (movie.id || movie.movieId)){
      movie._id=item._id
    }
  })
}