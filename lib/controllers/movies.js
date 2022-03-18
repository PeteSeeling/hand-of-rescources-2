const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()

  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.listAllMovies();
    res.send(movies);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const movie = await Movie.findMovieById(req.params.id);

      res.send(movie);

    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const movie = await Movie.updateMovieById(req.params.id, req.body);
    res.send(movie);
  })

  .delete('/:id', async (req, res) => {
    const movie = await Movie.deleteMovieById(req.params.id);
    res.send(movie);
  });
  
