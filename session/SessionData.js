export default class SessionData {
  constructor(data) {
    if (data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, val] of Object.entries(data)) {
        this[key] = val;
      }
    }
  }

  toJSON() {
    const obj = {};

    Object.keys(this).forEach(key => {
      obj[key] = this[key];
    });

    return obj;
  }

  inspect() {
    return this.toJSON();
  }

  get length() {
    return Object.keys(this.toJSON()).length;
  }

  get populated() {
    return !!this.length;
  }
}
