const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/movie');

describe('hand-of-rescources-2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a movie', async () => {
    const expected = {
      title: 'Training Day',
      star: 'Denzel Washingtion',
      years: 2004
    };
    const res = await request(app).post('/api/v1/movies').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
it('gets a list of moviews', async () => {
    const expected = await Movie.listAllMovies();
    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual(expected);
});

});
