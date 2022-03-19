const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pizza = require('../lib/models/Pizza');

describe('hand-of-rescources-2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates a pizza', async () => {
    const expected = {
      named: 'Detroit Style', 
      crust:'Thick',
      toppings:4
    };
    const res = await request(app).post('/api/v1/pizzas').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of pizzas', async () => {
    const expected = await Pizza.listAllPizzas();
    const res = await request(app).get('/api/v1/pizzas');

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for a pizza that is not found', async () => {
    const res = await request(app).get('/api/v1/pizzas/345');
    expect(res.status).toEqual(404);
  });

  it('it updates a pizza by id', async () => {
    const pizza = {
      named: 'Detroit Stlye',
      crust: 'Thick',
      founded: 4
    };
    const expected = await Pizza.insert(pizza);
    const res = await request(app)
      .patch(`/api/v1/pizzas/${expected.id}`)
      .send({ crust: 'Thin' });

    expect(res.body).toEqual({ ...expected, crust:'Thin' });
  });

  it('deletes a pizzaby id', async () => {
    const pizza = {
      named: 'Detroit Stlye',
      crust: 'Thick',
      founded: 4
    };
    const expected = await Pizza.insert(pizza);
    const res = await request(app).delete(`/api/v1/pizzas/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
