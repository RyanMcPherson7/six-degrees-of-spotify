/* eslint no-undef: 0 */
const request = require('supertest')
const app = require('../src/app')

describe('GET /api/path?start=&end=', () => {
  it('should return a 200 response', async () => {
    // Act
    const res = await request(app).get(
      '/api/path?start=Kanye West&end=The Beatles'
    )

    // Assert
    expect(res.statusCode).toBe(200)
  })

  it('should return json data', async () => {
    // Act
    const res = await request(app).get(
      '/api/path?start=Kanye West&end=The Beatles'
    )

    // Assert
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  it('should set "valid" to true when input is valid', async () => {
    // Act
    const res1 = await request(app).get(
      '/api/path?start=Kanye West&end=The Beatles'
    )
    const res2 = await request(app).get(
      // '/api/path/EMPIRE OF THE SUN/TAME IMPALA'
      '/api/path?start=EMPIRE OF THE SUN&end=TAME IMPALA'
    )
    const res3 = await request(app).get(
      '/api/path?start=taylor swift&end=backstreet boys'
    )

    // Assert
    expect(res1.body.valid).toEqual(true)
    expect(res2.body.valid).toEqual(true)
    expect(res3.body.valid).toEqual(true)
  })

  it('should set "valid" to false when input is invalid or not provided', async () => {
    // Act
    const res1 = await request(app).get('/api/path?start=1234&end=abcd')
    const res2 = await request(app).get('/api/path?start=5678')
    const res3 = await request(app).get('/api/path?end=ijkl')

    // Assert
    expect(res1.body.valid).toEqual(false)
    expect(res2.body.valid).toEqual(false)
    expect(res3.body.valid).toEqual(false)
  })

  it('should send a response containing the path', async () => {
    // Act
    const res = await request(app).get(
      '/api/path?start=Kanye West&end=The Beatles'
    )

    // Assert
    expect(res.body.valid).toEqual(true)
    expect(res.body.path.length).toBeTruthy()
  })

  it('should send a response containing the path with a single artist', async () => {
    // Act
    const res = await request(app).get(
      '/api/path?start=Kanye West&end=Kanye West'
    )

    // Assert
    expect(res.body.valid).toEqual(true)
    expect(res.body.path.length).toEqual(1)
  })

  it('should send a response containing a list of invalid artists', async () => {
    // Act
    const res1 = await request(app).get('/api/path?start=1234&end=abcd')
    const res2 = await request(app).get('/api/path?start=5678&end=Kanye West')
    const res3 = await request(app).get('/api/path?start=Kanye West&end=ijkl')

    // Assert
    expect(res1.body.invalid_artists).toEqual(['1234', 'abcd'])
    expect(res2.body.invalid_artists).toEqual(['5678'])
    expect(res3.body.invalid_artists).toEqual(['ijkl'])
  })
})

describe('POST /api/path', () => {
  it('should return a 200 response', async () => {
    // act
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    })

    // Assert
    expect(res.statusCode).toBe(200)
  })

  it('should return json data', async () => {
    // Act
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    })

    // Assert
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  it('should set "valid" to true when input is valid', async () => {
    // Act
    const res1 = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    })
    const res2 = await request(app).post('/api/path/').send({
      start: 'EMPIRE OF THE SUN',
      end: 'TAME IMPALA',
    })
    const res3 = await request(app).post('/api/path/').send({
      start: 'taylor swift',
      end: 'backstreet boys',
    })

    // Assert
    expect(res1.body.valid).toEqual(true)
    expect(res2.body.valid).toEqual(true)
    expect(res3.body.valid).toEqual(true)
  })

  it('should set "valid" to false when input is invalid or not provided', async () => {
    // Act
    const res1 = await request(app).post('/api/path').send({
      start: '1234',
      end: 'abcd',
    })
    const res2 = await request(app).post('/api/path').send({
      start: '5678',
    })
    const res3 = await request(app).post('/api/path').send({
      end: 'ijkl',
    })

    // Assert
    expect(res1.body.valid).toEqual(false)
    expect(res2.body.valid).toEqual(false)
    expect(res3.body.valid).toEqual(false)
  })

  it('should send a response containing the path', async () => {
    // Act
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'The Beatles',
    })

    // Assert
    expect(res.body.valid).toEqual(true)
    expect(res.body.path.length).toBeTruthy()
  })

  it('should send a response containing the path with a single artist', async () => {
    // Act
    const res = await request(app).post('/api/path/').send({
      start: 'Kanye West',
      end: 'Kanye West',
    })

    // Assert
    expect(res.body.valid).toEqual(true)
    expect(res.body.path.length).toEqual(1)
  })

  it('should send a response containing a list of invalid artists', async () => {
    // Act
    const res1 = await request(app).post('/api/path').send({
      start: '1234',
      end: 'abcd',
    })
    const res2 = await request(app).post('/api/path').send({
      start: '5678',
      end: 'Kanye West',
    })
    const res3 = await request(app).post('/api/path').send({
      start: 'Kanye West',
      end: 'ijkl',
    })

    // Assert
    expect(res1.body.invalid_artists).toEqual(['1234', 'abcd'])
    expect(res2.body.invalid_artists).toEqual(['5678'])
    expect(res3.body.invalid_artists).toEqual(['ijkl'])
  })
})

describe('GET /api/random/', () => {
  it('should return a 200 response', async () => {
    // Act
    const res = await request(app).get('/api/random/')

    // Assert
    expect(res.statusCode).toBe(200)
  })

  it('should return json data', async () => {
    // Act
    const res = await request(app).get('/api/random/')

    // Assert
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  it('should return 2 valid artist names and path', async () => {
    // Act
    const res = await request(app).get('/api/random/')
    const randomPathRes = await request(app).post('/api/path').send({
      start: res.body.start,
      end: res.body.end,
    })

    // Assert
    expect(res.body.start).toBeTruthy()
    expect(res.body.end).toBeTruthy()
    expect(randomPathRes.body.valid).toEqual(true)
    expect(res.body.path).not.toBeNull()
    expect(res.body.valid).toEqual(true)
  })
})

describe('GET /api/artists/', () => {
  it('should return a 200 response', async () => {
    // Act
    const res = await request(app).get('/api/artists/')

    // Assert
    expect(res.statusCode).toBe(200)
  })

  it('should return json data', async () => {
    // Act
    const res = await request(app).get('/api/artists/')

    // Assert
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  it('should return a list of artist names', async () => {
    // Act
    const res = await request(app).get('/api/artists/')

    // Assert
    expect(res.body.artistNameList).toBeTruthy()
  })
})
