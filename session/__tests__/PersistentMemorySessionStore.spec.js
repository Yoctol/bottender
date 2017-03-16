/* eslint-disable global-require */

jest.mock('fs');
jest.mock('steno');
jest.mock('jsonfile');

let fs;
let steno;
let jsonfile;

beforeEach(() => {
  jest.resetModules();

  fs = require('fs');

  steno = require('steno');
  jsonfile = require('jsonfile');

  fs.stat = jest.fn((filename, cb) => cb(null));
  steno.writeFile = jest.fn((filename, data, cb) => cb(null));
  jsonfile.readFile = jest.fn((filename, cb) => cb(null, {}));
});

it('should create new file when file does not exist', async () => {
  fs.stat = jest.fn((filename, cb) =>
    cb(new Error('no such file or directory')));
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;

  const store = new PersistentMemorySessionStore('sess.json', 500);
  expect(await store.init()).toBe(store);
  expect(steno.writeFile).toBeCalledWith(
    'sess.json',
    '{}',
    expect.any(Function),
  );
});

it('should not create new file when file exists', async () => {
  fs.stat = jest.fn((filename, cb) => cb(null, {
    dev: 16777220,
    mode: 33188,
    nlink: 1,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 111335250,
    size: 2668,
    blocks: 8,
    atime: '2017-03-16T06:55:21.000Z',
    mtime: '2017-03-16T06:39:44.000Z',
    ctime: '2017-03-16T06:39:44.000Z',
    birthtime: '2017-03-16T06:39:44.000Z',
  }));
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  expect(await store.init()).toBe(store);
  expect(steno.writeFile).not.toBeCalled();
});

it('should handle multiple types', async () => {
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  await store.init();
  const six = {};
  await store.set('1', undefined);
  await store.set('2', null);
  await store.set('3', true);
  await store.set('4', 4);
  await store.set('5', '5');
  await store.set('6', six);
  expect(await store.get('1')).toBeUndefined();
  expect(await store.get('2')).toBeNull();
  expect(await store.get('3')).toBe(true);
  expect(await store.get('4')).toBe(4);
  expect(await store.get('5')).toBe('5');
  expect(await store.get('6')).toBe(six);
});

it('should remove data from store when destroy be called', async () => {
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  await store.init();
  await store.set('1', 1);
  await store.set('2', 2);
  await store.set('3', 3);
  await store.destroy('2');
  expect(await store.get('1')).toBe(1);
  expect(await store.get('2')).toBeUndefined();
  expect(await store.get('3')).toBe(3);
});

it('should read session from persistent session file when it does not exist in memory', async () => {
  jsonfile.readFile = jest.fn((filename, cb) => cb(null, { 1: 'cph' }));
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  await store.init();
  expect(await store.get('1')).toBe('cph');
});

it('should not write to file before timing of taking snapshot', async () => {
  jest.useFakeTimers();

  jsonfile.readFile = jest.fn((filename, cb) => cb(null, { 1: 'cph' }));
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  await store.init();
  await store.set('2', 'kpman');

  jest.runTimersToTime(25000);

  jest.useRealTimers();

  // to next tick of event loop for async setInterval
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(steno.writeFile).not.toBeCalled();
});

it('should write merged session map to file when taking snapshot', async () => {
  jest.useFakeTimers();

  jsonfile.readFile = jest.fn((filename, cb) => cb(null, { 1: 'cph' }));
  const PersistentMemorySessionStore = require('../PersistentMemorySessionStore').default;
  const store = new PersistentMemorySessionStore('sess.json', 500);
  await store.init();
  await store.set('2', 'kpman');

  jest.runTimersToTime(30000);

  jest.useRealTimers();

  // to next tick of event loop for async setInterval
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(steno.writeFile).toBeCalledWith(
    'sess.json',
    '{"1":"cph","2":"kpman"}',
    expect.any(Function),
  );
});
