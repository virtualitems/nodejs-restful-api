const request = require('request');
const vars = require('./vars.js');


function allRequest(url) {
  return new Promise((resolve) => {

    request.get({ url }, (error, response, body) => {
      resolve({ error, response, body });
    });

  });

}


function findRequest(url) {
  return new Promise((resolve) => {

    request.get({ url }, (error, response, body) => {
      resolve({ error, response, body });
    });

  });

}


function createRequest(url, payload) {
  return new Promise((resolve) => {

    const options = {
      url,
      json: true,
      body: payload,
    };

    request.post(options, (error, response, body) => {
      resolve({ error, response, body });
    });

  });
}


function updateRequest(url, payload) {
  return new Promise((resolve) => {

    const options = {
      url,
      json: true,
      body: payload,
    };

    request.put(options, (error, response, body) => {
      resolve({ error, response, body });
    });

  });
}


function deleteRequest(url) {
  return new Promise((resolve) => {

    request.delete({ url }, (error, response, body) => {
      resolve({ error, response, body });
    });

  });
}


describe('POST /v1/owners/', () => {

  it('should return 201 Created', async () => {

    const url = new URL('/v1/owners', vars.baseURL);

    const results = await (
      Promise.all([
        createRequest(url, {
          slug: 'test-1',
          name: 'Test 1',
        }),
        createRequest(url, {
          slug: 'test-2',
          name: 'Test 2',
        }),
        createRequest(url, {
          slug: 'test-3',
          name: 'Test 3',
        }),
        createRequest(url, {
          slug: 'test-4',
          name: 'Test 4',
        }),
        createRequest(url, {
          slug: 'test-5',
          name: 'Test 5',
        }),
        createRequest(url, {
          slug: 'test-6',
          name: 'Test 6',
        }),
        createRequest(url, {
          slug: 'test-7',
          name: 'Test 7',
        }),
        createRequest(url, {
          slug: 'test-8',
          name: 'Test 8',
        }),
        createRequest(url, {
          slug: 'test-9',
          name: 'Test 9',
        }),
      ])
    );

    for (const result of results) {
      expect(result.response.statusCode).toBe(201);
    }

  });

});


describe('GET /v1/owners/', () => {

  it('should return 200 OK', async () => {

    const url = new URL('/v1/owners', vars.baseURL);

    const result = await allRequest(url);

    expect(result.response.statusCode).toBe(200);

    const body = JSON.parse(result.body);

    expect(body).toBeInstanceOf(Object);
    expect(body.message).toBeDefined();
    expect(body.error).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeGreaterThan(0);

  });

});


describe('GET /v1/owners/test-8', () => {

  it('should return 200 OK', async () => {

    const url = new URL('/v1/owners/test-8', vars.baseURL);

    const result = await findRequest(url);

    expect(result.response.statusCode).toBe(200);

    const body = JSON.parse(result.body);

    expect(body).toBeInstanceOf(Object);
    expect(body.message).toBeDefined();
    expect(body.error).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data.slug).toBe('test-8');
    expect(body.data.name).toBe('Test 8');

  });

});


describe('PUT /v1/owners/test-8', () => {

  it('should return 204 No Content', async () => {

    const url = new URL('/v1/owners/test-8', vars.baseURL);

    const result = await updateRequest(url, {
      name: 'Test 8 Updated',
    });

    expect(result.response.statusCode).toBe(204);

  });

});


describe('DELETE /v1/owners/test-8', () => {

  it('should return 204 No Content', async () => {

    const url = new URL('/v1/owners/test-8', vars.baseURL);

    const result = await deleteRequest(url)

    expect(result.response.statusCode).toBe(204);

  });

});


describe('GET /v1/owners/test-8', () => {

  it('should return 404 Not Found', async () => {

    const url = new URL('/v1/owners/test-8', vars.baseURL);

    const result = await findRequest(url);

    expect(result.response.statusCode).toBe(404);

  });

});
