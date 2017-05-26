/* eslint-disable global-require */
jest.mock('mongodb');

let MongoClient;

beforeEach(() => {
  MongoClient = require('mongodb').MongoClient;

  MongoClient.connect = jest.fn();
});

afterEach(() => {
  delete process.env.MONGO_URL;
  jest.resetModules();
});

describe('resolve', () => {
  it('connect only one time', async () => {
    const resolve = require('../resolve').default;

    const db = {};
    MongoClient.connect.mockReturnValue(Promise.resolve(db));
    await resolve();
    await resolve();
    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
  });

  it('connect mongodb with default url when no env variable', async () => {
    const resolve = require('../resolve').default;

    const db = {};
    MongoClient.connect.mockReturnValue(Promise.resolve(db));
    const resolved = await resolve();
    expect(MongoClient.connect).toBeCalledWith(
      'mongodb://localhost:27017/toolbot'
    );
    expect(resolved).toBe(db);
  });

  it('connect mongodb with url in env variable', async () => {
    const resolve = require('../resolve').default;

    process.env.MONGO_URL = 'mongodb://localhost:54321/toolbot';
    const db = {};
    MongoClient.connect.mockReturnValue(Promise.resolve(db));
    const resolved = await resolve();
    expect(MongoClient.connect).toBeCalledWith(
      'mongodb://localhost:54321/toolbot'
    );
    expect(resolved).toBe(db);
  });

  it('should use mock when connect failed', async () => {
    const resolve = require('../resolve').default;

    MongoClient.connect.mockImplementation(() => {
      throw new Error();
    });

    const resolved = await resolve();
    expect(resolved.__MOCK__).toBe(true);
  });
});
