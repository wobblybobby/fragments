// tests/unit/getid.test.js

const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/fragments', () => {
  // // If the request is missing the Authorization header, it should be forbidden
  // test('unauthenticated requests are denied', async () => {
  //   const res = await request(app)
  //     .post('/v1/fragments')
  //     .auth('user1@email.com', 'password1')
  //     .set({ 'Content-Type': 'text/plain' })
  //     .send('Text/plain test');
  //   const id = JSON.parse(res.text).fragment.id;

  //   await request(app)
  //     .get('/v1/fragments/' + id)
  //     .expect(401);
  // });

  // // If the wrong username/password pair are used (no such user), it should be forbidden
  // test('incorrect credentials are denied', async () => {
  //   const res = await request(app)
  //     .post('/v1/fragments')
  //     .auth('user1@email.com', 'password1')
  //     .set({ 'Content-Type': 'text/plain' })
  //     .send('Text/plain test');
  //   const id = JSON.parse(res.text).fragment.id;

  //   await request(app)
  //     .get('/v1/fragments/' + id)
  //     .auth('invalid@email.com', 'incorrect_password')
  //     .expect(401);
  // });

  // Valid fragment return using id
  test('authenticated users get fragment', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set({ 'Content-Type': 'text/plain' })
      .send('Text/plain test');
    const id = JSON.parse(res.text).fragment.id;

    const res2 = await request(app)
      .get('/v1/fragments/' + id)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
    // expect(res2.body.status).toBe('ok');
  });

  test('authenticated users get fragment metadata', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set({ 'Content-Type': 'text/plain' })
      .send('Text/plain test');
    const id = JSON.parse(res.text).fragment.id;

    const res2 = await request(app)
      .get('/v1/fragments/' + id + '/info')
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
  });
});
