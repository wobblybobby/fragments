// tests/unit/app.test.js

const request = require('supertest');

// Get our Express app object (we don't need the server part)
const app = require('../../src/app');

describe('/ health check', () => {
  test('should return HTTP 404 response', async () => {
    const res = await request(app).get('/testLine39');
    expect(res.statusCode).toBe(404);
  });

  test('should return status: error in response', async () => {
    const res = await request(app).get('/testLine39');
    expect(res.body.status).toEqual('error');
  });

  test('should return error in response', async () => {
    const res = await request(app).get('/testLine39');
    expect(res.body.error).toEqual({
      message: 'not found',
      code: 404,
    });
  });
});
