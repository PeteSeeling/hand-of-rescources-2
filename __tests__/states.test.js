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
          number:51
      }
      const res = await request(app).post('api/v1/states');

      expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });