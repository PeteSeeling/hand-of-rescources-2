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

    it('returns 404 for a country that is not found', async () => {
        const res = await request(app).get('/api/v1/countries/980');
        expect(res.status).toEqual(404);
    });

    it('it updates a country by its id', async () => {
        const country = {
            named: 'Nicaragua',
            borders: 'Costa Rica',
            founded: 1821
        };
        const expected = await Country.insert(country);
        const res = await request(app)
            .patch(`/api/v1/countries/${expectd.id}`)
            .send({ borders: 'Honduras' });

            expect(res.body).toEqual({ ...expected, borders:'Honduras'});
    });

    