import { trimDomain } from '../profile';

it('should be defined', () => {
  expect(trimDomain).toBeDefined();
});

describe('#trimDomain', () => {
  it('should remove whitelisted_domains end slash', () => {
    const testProfile = {
      whitelisted_domains: [
        'https://www.facebook.com/',
        'https://facebook.com',
      ],
    };
    const trimProfile = trimDomain(testProfile);
    expect(trimProfile).toEqual({
      whitelisted_domains: ['https://www.facebook.com', 'https://facebook.com'],
    });
  });
});
