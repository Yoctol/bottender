import getProjectWebviewLink, { getLinkPrefix } from '../getProjectWebviewLink';

beforeEach(() => {
  delete process.env.DOMAIN;
});

it('be defined', () => {
  expect(getProjectWebviewLink).toBeDefined();
  expect(getLinkPrefix).toBeDefined();
});

it('returns a function when pass in project parameter', () => {
  expect(typeof getProjectWebviewLink('project')).toBe('function');
});

describe('#getWebviewLink', () => {
  let getWebviewLink;

  beforeEach(() => {
    getWebviewLink = getProjectWebviewLink('bnext-fc');
  });

  it('add protocol when DOMAIN set only domain', () => {
    process.env.DOMAIN = 'yoctol.com';
    expect(getWebviewLink('location')).toBe(
      'https://yoctol.com/public/bnext-fc/webviews/location'
    );
  });

  it('does not add protocol when DOMAIN set with http protocol', () => {
    process.env.DOMAIN = 'http://yoctol.com';
    expect(getWebviewLink('location')).toBe(
      'http://yoctol.com/public/bnext-fc/webviews/location'
    );
  });

  it('does not add protocol when DOMAIN set with https protocol', () => {
    process.env.DOMAIN = 'https://yoctol.com';
    expect(getWebviewLink('location')).toBe(
      'https://yoctol.com/public/bnext-fc/webviews/location'
    );
  });

  it('get localhost when process.env.DOMAIN is not defined', () => {
    expect(getWebviewLink('location')).toBe(
      'http://localhost:5000/public/bnext-fc/webviews/location'
    );
  });
});

describe('#getLinkPrefix', () => {
  it('add localhost with port when DOMAIN is not defined', () => {
    expect(getLinkPrefix('/public/bnext-fc/apis/favorites')).toBe(
      'http://localhost:5000/public/bnext-fc/apis/favorites'
    );
  });

  it('add https protocol and DOMAIN when DOMAIN is defined', () => {
    process.env.DOMAIN = 'www.yoctol.com';
    expect(getLinkPrefix('/public/bnext-fc/apis/favorites')).toBe(
      'https://www.yoctol.com/public/bnext-fc/apis/favorites'
    );
  });
});
