const { Router } = require('express');
const State = require('../models/State');

module.exports = Router()

  .post('/', async (req, res) => {
    const state = State.insert(req.body);
    res.send(state);
  });
