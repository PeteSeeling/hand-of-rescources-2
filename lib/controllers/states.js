const { Router } = require('express');
const State = require('../models/State');

module.exports = Router()

  .post('/', async (req, res) => {
    const state = State.insert(req.body);
    res.send(state);
  })

  .get('/', async (req, res) => {
    const states = await State.listAllStates();
    res.send(states);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const state = await State.findStateById(req.params.id);

      res.send(state);
    } catch(error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const state = await State.updateStateById(req.params.id, req.body);

    res.send(state);
  })

  .delete('/:id', async (req, res) => {
    const state = await State.deleteStateById(req.params.id) ;
    res.send(state);
  });


