const request = require('supertest');
const express = require('express');
const causalRoutes = require('./causal');

const app = express();
app.use('/api/v1/causal', causalRoutes);

describe('Causal Routes', () => {
  it('should return a list of causal anomalies', async () => {
    const res = await request(app).get('/api/v1/causal/anomalies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('anomalies');
  });
});
