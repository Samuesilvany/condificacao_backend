const movies = require('../../data/movies.mock');

const getAllMovies = () => {
  return movies;
};

const getMovieById = (id) => {
  return movies.find(movie => movie.id === Number(id));
};

module.exports = {
  getAllMovies,
  getMovieById
};