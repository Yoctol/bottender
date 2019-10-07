jest.mock('warning');

const warning = require('warning');

const { isValidTemplate, compileTemplate } = require('../utils');

describe('#isValidTemplate', () => {
  it('should not allow invalid syntax', () => {
    expect(isValidTemplate('Hi')).toBe(false);
    expect(isValidTemplate('Hi, {{}}')).toBe(false);
    expect(isValidTemplate('Hi, {{.}}')).toBe(false);
    expect(isValidTemplate('Hi, {{context.}}')).toBe(false);
    expect(isValidTemplate('Hi, {{context.session.user.}}')).toBe(false);
  });

  it('should support only keywords with properties access', () => {
    expect(isValidTemplate('Hi, {{context.session.user.first_name}}')).toBe(
      true
    );
    expect(isValidTemplate('Hi, {{session.user.first_name}}')).toBe(true);
    expect(isValidTemplate('Hi, {{user.first_name}}')).toBe(true);
    expect(isValidTemplate('Hi, {{context.event.text}}')).toBe(true);
    expect(isValidTemplate('Hi, {{event.text}}')).toBe(true);
    expect(isValidTemplate('Hi, {{context.state.xxx}}')).toBe(true);
    expect(isValidTemplate('Hi, {{state.xxx}}')).toBe(true);
    expect(isValidTemplate('Hi, {{unknown.xxx}}')).toBe(false);
  });

  it('should allow whitespaces', () => {
    expect(isValidTemplate('Hi, {{ context.session.user.first_name}}')).toBe(
      true
    );
    expect(isValidTemplate('Hi, {{context.session.user.first_name }}')).toBe(
      true
    );
    expect(isValidTemplate('Hi, {{ context.session.user.first_name }}')).toBe(
      true
    );
    expect(
      isValidTemplate('Hi, {{    context.session.user.first_name    }}')
    ).toBe(true);
  });

  it('should support es6 template string', () => {
    const HI = 'Hi';
    expect(isValidTemplate(`${HI}, {{context.session.user.first_name}}`)).toBe(
      true
    );
  });

  it('should allow multiple keywords', () => {
    expect(
      isValidTemplate(
        'Hi, {{context.session.user.first_name}} & {{context.state.xxx}}'
      )
    ).toBe(true);
  });

  it('should support other param', () => {
    expect(isValidTemplate('Hi, {{param.cool}}')).toBe(true);
  });

  it('should support props', () => {
    expect(isValidTemplate('Hi, {{props.cool}}')).toBe(true);
  });
});

function expectTemplate(template, props) {
  const context = {
    session: {
      user: {
        first_name: 'James',
      },
    },
    event: { text: 'Cool' },
    state: {
      xxx: 'yyy',
    },
  };

  return expect(compileTemplate(template)(context, props));
}

describe('#compileTemplate', () => {
  it('should support only keywords with properties access', () => {
    expectTemplate('Hi, {{context.session.user.first_name}}').toBe('Hi, James');
    expectTemplate('Hi, {{session.user.first_name}}').toBe('Hi, James');
    expectTemplate('Hi, {{user.first_name}}').toBe('Hi, James');
    expectTemplate('Hi, {{context.event.text}}').toBe('Hi, Cool');
    expectTemplate('Hi, {{event.text}}').toBe('Hi, Cool');
    expectTemplate('Hi, {{context.state.xxx}}').toBe('Hi, yyy');
    expectTemplate('Hi, {{state.xxx}}').toBe('Hi, yyy');
  });

  it('should fallback falsy value into empty string', () => {
    expectTemplate('Hi, {{context.session.user.last_name}}').toBe('Hi, ');
  });

  it('should allow whitespaces', () => {
    expectTemplate('Hi, {{ context.session.user.first_name}}').toBe(
      'Hi, James'
    );
    expectTemplate('Hi, {{context.session.user.first_name }}').toBe(
      'Hi, James'
    );
    expectTemplate('Hi, {{ context.session.user.first_name }}').toBe(
      'Hi, James'
    );
    expectTemplate('Hi, {{    context.session.user.first_name    }}').toBe(
      'Hi, James'
    );
  });

  it('should support es6 template string', () => {
    const HI = 'Hi';
    expectTemplate(`${HI}, {{context.session.user.first_name}}`).toBe(
      'Hi, James'
    );
  });

  it('should allow two keywords', () => {
    expectTemplate(
      'Hi, {{context.session.user.first_name}} & {{context.state.xxx}}'
    ).toBe('Hi, James & yyy');
  });

  it('should allow multiple keywords', () => {
    expectTemplate(
      'Hi, {{context.session.user.first_name}} & {{context.state.xxx}} & {{context.event.text}}'
    ).toBe('Hi, James & yyy & Cool');
  });

  it('should support other param', () => {
    expectTemplate('Hi, {{param.name}}', { name: 'James' }).toBe('Hi, James');
  });

  it('should support props', () => {
    expectTemplate('Hi, {{props.name}}', { name: 'James' }).toBe('Hi, James');
  });

  describe('#warning', () => {
    it('should not show warning when the result of properties accessors is not a string', () => {
      expectTemplate('Hi, {{context.session.user.first_name}}');
      expect(warning).toBeCalledWith(
        true,
        'Properties accessors (context.session.user.first_name) in template is invalid -- expected return a non-empty string but got: string'
      );
    });

    it('should show warning when the result of properties accessors is not a string', () => {
      expectTemplate('Hi, {{context.session.user}}').toBe(
        'Hi, [object Object]'
      );
      expect(warning).toBeCalledWith(
        false,
        'Properties accessors (context.session.user) in template is invalid -- expected return a non-empty string but got: object'
      );
    });
  });
});
