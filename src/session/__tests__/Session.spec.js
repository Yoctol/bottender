import Session from '../Session';

describe('construct with data', () => {
  let data;
  let session;
  beforeEach(() => {
    data = {
      a: 1,
      b: 2,
    };
    session = new Session(data);
  });

  it('init', () => {
    expect(session.toJSON()).toEqual(data);
    expect(session.inspect()).toEqual(data);
    expect(session.length).toBe(2);
    expect(session.populated).toBe(true);
  });

  it('add data', () => {
    session.c = 3;
    expect(session.toJSON()).toEqual({
      ...data,
      c: 3,
    });
    expect(session.inspect()).toEqual({
      ...data,
      c: 3,
    });
    expect(session.length).toBe(3);
    expect(session.populated).toBe(true);
  });
});

describe('construct without data', () => {
  let session;
  beforeEach(() => {
    session = new Session();
  });

  it('init', () => {
    expect(session.toJSON()).toEqual({});
    expect(session.inspect()).toEqual({});
    expect(session.length).toBe(0);
    expect(session.populated).toBe(false);
  });
});
