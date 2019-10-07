const { not, and, or, alwaysTrue, alwaysFalse } = require('../logic');

it('#not should work', () => {
  const context = {
    event: {
      isText: true,
      text: 'ok',
    },
  };

  const isText = () => _context => _context.event.isText;

  const predicate = not(isText());

  expect(predicate(context)).toBe(false);
});

it('#and should work', () => {
  const context = {
    event: {
      isText: true,
      text: 'ok',
    },
  };

  const isText = () => _context => _context.event.isText;
  const isOk = () => _context => _context.event.text === 'ok';

  const predicate = and([isText, isOk]);

  expect(predicate(context)).toBe(true);
});

it('#or should work', () => {
  const context = {
    event: {
      isText: true,
      text: 'not ok',
    },
  };

  const isText = () => _context => _context.event.isText;
  const isOk = () => _context => _context.event.text === 'ok';

  const predicate = or([isText, isOk]);

  expect(predicate(context)).toBe(true);
});

it('#alwaysTrue should work', () => {
  const context = {
    event: {
      isText: true,
      text: 'ok',
    },
  };

  const predicate = alwaysTrue();

  expect(predicate(context)).toBe(true);
});

it('#alwaysFalse should work', () => {
  const context = {
    event: {
      isText: true,
      text: 'ok',
    },
  };

  const predicate = alwaysFalse();

  expect(predicate(context)).toBe(false);
});
