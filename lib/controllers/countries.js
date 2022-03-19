const { Router } = require('express');
const Country = require('../models/Country');

module.exports = Router()

  .post('/', async (req, res) => {
    const country = await Country.insert(req.body);
    res.send(country);
  })

  .get('/', async (req, res) => {
    const countries = await Country.listAllCountries();
    res.send(countries);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const country = await Country.findCountryById(req.params.id);

      res.send(country);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch
