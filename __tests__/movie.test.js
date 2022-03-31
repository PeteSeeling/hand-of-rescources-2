const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

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

  it('gets a list of movies', async () => {
    const expected = await Movie.listAllMovies();
    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for a movie not found', async () => {
    const res = await request(app).get('/api/v1/movies/800');
    expect(res.status).toEqual(404);
  });

  it('it updates a movie by id', async () => {
    const movie = {
    
      title:'Training Day',
      star:'Denzel Washington',
      years:2004
    };

    const expected = await Movie.insert(movie);
    const res = await request(app)
      .patch(`/api/v1/movies/${expected.id}`)
      .send({ years: '2005' });

    expect(res.body).toEqual({ ...expected, years:2005 });

  });

  it('deletes a movie by id', async () => {
    const movie = {
    
      title:'Training Day',
      star:'Denzel Washington',
      years:2004
    };
    
    const expected = await Movie.insert(movie);
    const res = await request(app).delete(`/api/v1/movies/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
