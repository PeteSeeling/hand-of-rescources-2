const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('hand-of-rescources-2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a dog', async () => {
    const expected = {
      breed: 'newfoundland',
      named: 'Chelsea',
      age: 12
    };
    
    const res = await request(app).post('/api/v1/dogs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of dogs', async () => {
    const expected = await Dog.listAllDogs();
    const res = await request(app).get('/api/v1/dogs');

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for a dog not found', async () => {
    const res = await request(app).get('/api/v1/dogs/800');
    expect(res.status).toEqual(404);
  });

  it('it updates a dog by id', async () => {
    const dog = {
    
      breed: 'newfoundland',
      named: 'Chelsea',
      age: 12
    };

    const expected = await Dog.insert(dog);
    const res = await request(app)
      .patch(`/api/v1/dogs/${expected.id}`)
      .send({ age: '18' });

    expect(res.body).toEqual({ ...expected, age:18 });

  });

  it('deletes a dog by id', async () => {
    const dog = {
    
      breed: 'newfoundland',
      named: 'Chelsea',
      age: 12
    };
    const expected = await Dog.insert(dog);
    const res = await request(app).delete(`/api/v1/dogs/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
