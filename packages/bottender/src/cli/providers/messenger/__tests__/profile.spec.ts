import { trimDomain } from '../profile';

describe('#trimDomain', () => {
  it('should remove whitelisted_domains end slash', () => {
    const testProfile = {
      whitelistedDomains: ['https://www.facebook.com/', 'https://facebook.com'],
    };

    const trimProfile = trimDomain(testProfile);

    expect(trimProfile).toEqual({
      whitelistedDomains: ['https://www.facebook.com', 'https://facebook.com'],
    });
  });
});
