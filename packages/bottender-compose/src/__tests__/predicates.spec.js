const { isTextMatch, isPayloadMatch, hasStateEqual } = require('../predicates');

describe('#isTextMatch', () => {
  it('should work with RegExp', () => {
    const predicate = isTextMatch(/yes/);

    expect(
      predicate({
        event: {
          isText: true,
          text: 'yes',
        },
      })
    ).toBe(true);

    expect(
      predicate({
        event: {
          isText: true,
          text: 'no',
        },
      })
    ).toBe(false);
  });

  it('should work with string', () => {
    const predicate = isTextMatch('yes');

    expect(
      predicate({
        event: {
          isText: true,
          text: 'yes',
        },
      })
    ).toBe(true);

    expect(
      predicate({
        event: {
          isText: true,
          text: 'no',
        },
      })
    ).toBe(false);
  });
});

describe('#isPayloadMatch', () => {
  it('should work with RegExp', () => {
    const predicate = isPayloadMatch(/yes/);

    expect(
      predicate({
        event: {
          isPayload: true,
          payload: 'yes',
        },
      })
    ).toBe(true);

    expect(
      predicate({
        event: {
          isPayload: true,
          payload: 'no',
        },
      })
    ).toBe(false);
  });

  it('should work with string', () => {
    const predicate = isPayloadMatch('yes');

    expect(
      predicate({
        event: {
          isPayload: true,
          payload: 'yes',
        },
      })
    ).toBe(true);

    expect(
      predicate({
        event: {
          isPayload: true,
          payload: 'no',
        },
      })
    ).toBe(false);
  });
});

describe('#hasStateEqual', () => {
  it('should work', () => {
    const predicate = hasStateEqual('x', 1);

    expect(
      predicate({
        state: {
          x: 1,
        },
      })
    ).toBe(true);

    expect(
      predicate({
        state: {
          x: 2,
        },
      })
    ).toBe(false);
  });

  it('should work with deep path', () => {
    const predicate = hasStateEqual('x.y.z', 1);

    expect(
      predicate({
        state: {
          x: {
            y: {
              z: 1,
            },
          },
        },
      })
    ).toBe(true);

    expect(
      predicate({
        state: {
          x: {
            y: {
              z: 2,
            },
          },
        },
      })
    ).toBe(false);
  });

  it('should work with object equal', () => {
    const predicate = hasStateEqual('x', { y: { z: 1 } });

    expect(
      predicate({
        state: {
          x: {
            y: {
              z: 1,
            },
          },
        },
      })
    ).toBe(true);

    expect(
      predicate({
        state: {
          x: {
            y: {
              z: 2,
            },
          },
        },
      })
    ).toBe(false);
  });
});
