const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const State = require('../lib/models/State');

describe('hand-of-rescources-2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates a new state', async () => {
    const expected = {
      named:'New Michigan',
      weather:'Bleak',
      statenumber:51
    };
    const res = await request(app).post('/api/v1/states').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of states', async () => {
    const expected = await State.listAllStates();
    const res = await request(app).get('/api/v1/states');

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for a state not found', async () => {
    const res = await request(app).get('/api/v1/states//654');

    expect(res.status).toEqual(404);
  });

  it('it updates a state by id', async () => {
    const state = {
      named: 'New Michigan',
      weather: 'Bleak',
      statenumber: 51
    };
    const expected = await State.insert(state);
    const res = await request(app)
      .patch(`/api/v1/states/${expected.id}`)
      .send({ weather: 'OK' });

    expect(res.body).toEqual({ ...expected, weather:'OK' });
  });


  it('deletes a state by id', async () => {
    const state = {

      named:'New Michigan',
      weather:'Bleak',
      statenumber: 51
    };
    const expected = await State.insert(state);
    const res = await request(app).delete(`/api/v1/states/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});


