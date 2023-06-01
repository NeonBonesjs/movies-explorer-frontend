import { MAX_DURATION_SHORT_FILM } from "./constants";

export const filterMovies = (searchQuery, moviesArray) => {
  return moviesArray.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const filterShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration < MAX_DURATION_SHORT_FILM);
};