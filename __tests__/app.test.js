import request from 'supertest';

jest.mock('../db/Funding.js');

const app = require('../server/app');

test('get to "/" should get index.html', () => request(app).get('/').expect('Content-Type', /html/));

test('get to "funding-rounds/:company" should get json', () => {
  return request(app)
    .get('/funding-rounds/Facebook')
    .set('Accept', 'application/json')
    .then(response => expect(response.body[0].company).toBe('Facebook'));
});
