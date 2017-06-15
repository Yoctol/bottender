/* @flow */

export type SessionJSONObject = { [key: string]: mixed };

export default class Session {
  constructor(data: SessionJSONObject) {
    if (data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, val] of Object.entries(data)) {
        // $FlowExpectedError
        this[key] = val;
      }
    }
  }

  toJSON(): SessionJSONObject {
    const obj = {};

    Object.keys(this).forEach(key => {
      // $FlowExpectedError
      obj[key] = this[key];
    });

    return obj;
  }

  inspect(): SessionJSONObject {
    return this.toJSON();
  }

  get length(): number {
    return Object.keys(this.toJSON()).length;
  }

  get populated(): boolean {
    return !!this.length;
  }
}
