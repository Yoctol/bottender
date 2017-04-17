import SessionData from '../SessionData';

describe('construct with data', () => {
  let data;
  let sessionData;
  beforeEach(() => {
    data = {
      a: 1,
      b: 2,
    };
    sessionData = new SessionData(data);
  });

  it('init', () => {
    expect(sessionData.toJSON()).toEqual(data);
    expect(sessionData.inspect()).toEqual(data);
    expect(sessionData.length).toBe(2);
    expect(sessionData.populated).toBe(true);
  });

  it('add data', () => {
    sessionData.c = 3;
    expect(sessionData.toJSON()).toEqual({
      ...data,
      c: 3,
    });
    expect(sessionData.inspect()).toEqual({
      ...data,
      c: 3,
    });
    expect(sessionData.length).toBe(3);
    expect(sessionData.populated).toBe(true);
  });
});

describe('construct without data', () => {
  let sessionData;
  beforeEach(() => {
    sessionData = new SessionData();
  });

  it('init', () => {
    expect(sessionData.toJSON()).toEqual({});
    expect(sessionData.inspect()).toEqual({});
    expect(sessionData.length).toBe(0);
    expect(sessionData.populated).toBe(false);
  });
});
