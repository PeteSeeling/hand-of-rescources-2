const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Country = require('../lib/models/Country');

describe('hand-of-rescources-2 routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });

    it('creates a country', async () => {
        const expected = {
          named: 'Nicaragua', 
          borders:'Costa Rica',
          founded:1821
        };
        const res = await (await request(app).post('/api/v1/countries')).setEncoding(expected);

        expect(res.body).toEqual({ id: expect.any(String), ...expected });
    });

    it('gets a list of countries', async () => {
        const expected = await Country.listAllCountries();
        const res = await request(app).get('/api/v1/countries');

        expect(res.body).toEqual(expected);
    });

    