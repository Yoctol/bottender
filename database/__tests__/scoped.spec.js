import scoped, { ScopedDB } from '../scoped';

describe('#scoped', () => {
  it('return a ScopedDB instance', async () => {
    expect(await scoped({}, 'cph')).toBeInstanceOf(ScopedDB);
  });
});

function createMockDB() {
  return {
    collection: jest.fn(),
    collections: jest.fn(),
    createCollection: jest.fn(),
    createIndex: jest.fn(),
    dropCollection: jest.fn(),
    ensureIndex: jest.fn(),
    indexInformation: jest.fn(),
    renameCollection: jest.fn(),
  };
}

describe('#ScopedDB', () => {
  it('#scope', () => {
    const db = createMockDB();
    expect(new ScopedDB(db, 'cph').scope).toBe('cph');
  });

  it('#scope', () => {
    const db = createMockDB();
    expect(new ScopedDB(db, 'cph-awesome-nlp-cool-great').scope).toBe(
      'cph_awesome_nlp_cool_great',
    );
  });

  it('#collection', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.collection('logs');
    expect(db.collection).toBeCalledWith('cph.logs');
  });

  it('#collections', async () => {
    const db = createMockDB();
    db.collections.mockReturnValue(
      Promise.resolve([
        { collectionName: 'cph.girls' },
        { collectionName: 'kpman.girls ' },
      ]),
    );
    const scopedDB = new ScopedDB(db, 'cph');
    const collections = await scopedDB.collections();
    expect(collections).toEqual([{ collectionName: 'cph.girls' }]);
  });

  it('#createCollection', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.createCollection('logs');
    expect(db.createCollection).toBeCalledWith('cph.logs');
  });

  it('#createIndex', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.createIndex('logs');
    expect(db.createIndex).toBeCalledWith('cph.logs');
  });

  it('#dropCollection', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.dropCollection('logs');
    expect(db.dropCollection).toBeCalledWith('cph.logs');
  });

  it('#ensureIndex', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.ensureIndex('logs');
    expect(db.ensureIndex).toBeCalledWith('cph.logs');
  });

  it('#indexInformation', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.indexInformation('logs');
    expect(db.indexInformation).toBeCalledWith('cph.logs');
  });

  it('#renameCollection', () => {
    const db = createMockDB();
    const scopedDB = new ScopedDB(db, 'cph');
    scopedDB.renameCollection('logs', 'girls');
    expect(db.renameCollection).toBeCalledWith('cph.logs', 'cph.girls');
  });
});
