const express = require('express');
const router = express.Router();
const moviesService =('/services/movies.service');

router.get('/movies', (req, res) => {
  const movies = moviesService.getAllMovies();
  res.json(movies);
});

router.get('/movies/:id', (req, res) => {
  const movie = moviesService.getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }

  res.json(movie);
});

module.exports = router;