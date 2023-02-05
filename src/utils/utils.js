import { completeMissingField, PRE_LINK } from "./constants";

export const correctApiData = (data) => {
    data.forEach(item => {
      if (!item.image) {
        item.image = completeMissingField.image;
        item.thumbnail = completeMissingField.thumbnail;
      } else {
        item.image = `${PRE_LINK}${item?.image?.url}`;
        item.thumbnail = `${PRE_LINK}${item?.image?.formats?.thumbnail.url}` || '';
      }
      if(!item.country) {
        item.country = 'Russia';
      }
      if(!item.nameEN) {
        item.nameEN = item.nameRU;
      }
    });
    console.log('corrected:', data);
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

export const filterUnified = (movies, filter = {query: '', isShort: false}) => {
   console.log('FILTER', filter, movies);
   return filter.isShort ? filterByDuration(filterByQuery(movies, filter.query||'')) : filterByQuery(movies, filter.query||'');
}

export const checkSavedMovie = (arr, movie) => {
  return arr.find((item) => {
    (item.id || item.movieId) === (movie.id || movie.movieId);
  });
}
  