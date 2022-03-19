const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()

  .post('/', async (req, res) => {
    const country = await Pizza.insert(req.body);
    res.send(country);
  })

  .get('/', async (req, res) => {
    const pizzas = await Pizza.listAllPizzas();
    res.send(pizzas);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const pizza = await Pizza.findPizzaById(req.params.id);

      res.send(pizza);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const pizza = await Pizza.updatePizzaById(req.params.id, req.body);

    res.send(pizza);
  })

  .delete('/:id', async (req, res) => {
    const pizza = await Pizza.deletePizzaById(req.params.id);
    res.send(pizza);
  });


