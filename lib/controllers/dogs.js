const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()

  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.send(dog);
  })

  .get('/', async (req, res) => {
    const dogs = await Dog.listAllDogs();
    res.send(dogs);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const dog = await Dog.findDogById(req.params.id);

      res.send(dog);

    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const dog = await Dog.updateDogById(req.params.id, req.body);
    res.send(dog);
  })

  .delete('/:id', async (req, res) => {
    const dog = await Dog.deleteDogById(req.params.id);
    res.send(dog);
  });
