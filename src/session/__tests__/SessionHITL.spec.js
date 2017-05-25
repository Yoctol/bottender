import SessionData from '../SessionData';
import SessionHITL from '../SessionHITL';

describe('construct with paused info', () => {
  it('should keep pasued info', () => {
    let sessionData;
    let hitl;

    sessionData = new SessionData({ paused: true });
    hitl = new SessionHITL(sessionData);

    expect(hitl.isPaused).toEqual(true);

    sessionData = new SessionData({ paused: false });
    hitl = new SessionHITL(sessionData);

    expect(hitl.isPaused).toEqual(false);
  });

  it('pause should assign pasued to true', () => {
    const sessionData = new SessionData({ paused: false });
    const hitl = new SessionHITL(sessionData);

    hitl.pause();

    expect(hitl.isPaused).toEqual(true);
  });

  it('unpause should assign pasued to false', () => {
    const sessionData = new SessionData({ paused: true });
    const hitl = new SessionHITL(sessionData);

    hitl.unpause();

    expect(hitl.isPaused).toEqual(false);
  });
});

describe('construct without paused info', () => {
  it('isPaused should be false when initialized', () => {
    const sessionData = new SessionData();
    const hitl = new SessionHITL(sessionData);

    expect(hitl.isPaused).toEqual(false);
  });
});
