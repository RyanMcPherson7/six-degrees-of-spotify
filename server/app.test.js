const request = require('supertest');
const app = require('./app');

describe('GET path route', () => {
  test('GET /api/path/:start/:end (valid input) --> 200 response', async () => {
    const res = await request(app).get('/api/path/Kanye West/The Beatles');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/path/:start/:end (valid input) --> returns json data', async () => {
    const res = await request(app).get('/api/path/Kanye West/The Beatles');
    expect(res.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('GET /api/path/:start/:end (valid input) --> valid prop is true', async () => {
    const res1 = await request(app).get('/api/path/Kanye West/The Beatles');
    expect(res1.body.valid).toBeTruthy();

    const res2 = await request(app).get(
      '/api/path/EMPIRE OF THE SUN/TAME IMPALA'
    );
    expect(res2.body.valid).toBeTruthy();

    const res3 = await request(app).get(
      '/api/path/taylor swift/backstreet boys'
    );
    expect(res3.body.valid).toBeTruthy();
  });

  test('GET /api/path/:start/:end (invalid input) --> valid prop is false', async () => {
    const res1 = await request(app).get('/api/path/1234/abcd');
    expect(res1.body.valid).toBeFalsy();

    const res2 = await request(app).get('/api/path/5678/efgh');
    expect(res2.body.valid).toBeFalsy();

    const res3 = await request(app).get('/api/path/7777/ijkl');
    expect(res3.body.valid).toBeFalsy();
  });

  test('GET /api/path/:start/:end (valid input) --> returns expected path', async () => {
    const res = await request(app).get('/api/path/Kanye West/The Beatles');
    expect(res.body.path.length).toEqual(8);
    expect(res.body.path[0].artist).toEqual('Kanye West');
    expect(res.body.path[1].artist).toEqual('Frank Ocean');
    expect(res.body.path[2].artist).toEqual('Solange');
    expect(res.body.path[3].artist).toEqual('Amy Winehouse');
    expect(res.body.path[4].artist).toEqual('Nina Simone');
    expect(res.body.path[5].artist).toEqual('Ray Charles');
    expect(res.body.path[6].artist).toEqual('Chuck Berry');
    expect(res.body.path[7].artist).toEqual('The Beatles');
  });

  test('GET /api/path/:start/:end (invalid input) --> returns invalid names list', async () => {
    const res1 = await request(app).get('/api/path/1234/abcd');
    expect(res1.body.invalid_artists).toEqual(['1234', 'abcd']);

    const res2 = await request(app).get('/api/path/5678/Kanye West');
    expect(res2.body.invalid_artists).toEqual(['5678']);

    const res3 = await request(app).get('/api/path/Kanye West/ijkl');
    expect(res3.body.invalid_artists).toEqual(['ijkl']);
  });
});

describe('POST path route', () => {
  test('POST /api/path (valid input) --> 200 response', async () => {
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    });

    expect(res.statusCode).toBe(200);
  });

  test('POST /api/path/ (valid input) --> returns json data', async () => {
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    });
    expect(res.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('POST /api/path/ (valid input) --> valid prop is true', async () => {
    const res1 = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    });
    expect(res1.body).toBeTruthy();

    const res2 = await request(app).post('/api/path/').send({
      start: 'EMPIRE OF THE SUN',
      end: 'TAME IMPALA',
    });
    expect(res2.body).toBeTruthy();

    const res3 = await request(app).post('/api/path/').send({
      start: 'taylor swift',
      end: 'backstreet boys',
    });
    expect(res3.body).toBeTruthy();
  });

  test('POST /api/path/ (invalid input) --> valid prop is false', async () => {
    const res1 = await request(app).post('/api/path').send({
      start: '1234',
      end: 'abcd',
    });
    expect(res1.body.valid).toBeFalsy();

    const res2 = await request(app).post('/api/path').send({
      start: '5678',
      end: 'efgh',
    });
    expect(res2.body.valid).toBeFalsy();

    const res3 = await request(app).post('/api/path').send({
      start: '7777',
      end: 'ijkl',
    });
    expect(res3.body.valid).toBeFalsy();
  });

  test('POST /api/path/ (valid input) --> returns expected path', async () => {
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    });
    expect(res.body.path.length).toEqual(8);
    expect(res.body.path[0].artist).toEqual('Kanye West');
    expect(res.body.path[1].artist).toEqual('Frank Ocean');
    expect(res.body.path[2].artist).toEqual('Solange');
    expect(res.body.path[3].artist).toEqual('Amy Winehouse');
    expect(res.body.path[4].artist).toEqual('Nina Simone');
    expect(res.body.path[5].artist).toEqual('Ray Charles');
    expect(res.body.path[6].artist).toEqual('Chuck Berry');
    expect(res.body.path[7].artist).toEqual('The Beatles');
  });

  test('POST /api/path/ (invalid input) --> returns invalid names list', async () => {
    const res1 = await request(app).post('/api/path').send({
      start: '1234',
      end: 'abcd',
    });
    expect(res1.body.invalid_artists).toEqual(['1234', 'abcd']);

    const res2 = await request(app).post('/api/path').send({
      start: '5678',
      end: 'Kanye West',
    });
    expect(res2.body.invalid_artists).toEqual(['5678']);

    const res3 = await request(app).post('/api/path').send({
      start: 'Kanye West',
      end: 'ijkl',
    });
    expect(res3.body.invalid_artists).toEqual(['ijkl']);
  });
});

describe('GET random route', () => {
  test('GET /api/random/ --> 200 response', async () => {
    const res = await request(app).get('/api/random/');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/random/ --> returns json data', async () => {
    const res = await request(app).get('/api/random/');
    expect(res.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('GET /api/random/ --> returns 2 valid artist names', async () => {
    const res = await request(app).get('/api/random/');
    expect(res.body.start).toBeTruthy();
    expect(res.body.end).toBeTruthy();

    const randomPathRes = await request(app).post('/api/path').send({
      start: res.body.start,
      end: res.body.end,
    });

    expect(randomPathRes.body.valid).toBeTruthy();
  });
});
