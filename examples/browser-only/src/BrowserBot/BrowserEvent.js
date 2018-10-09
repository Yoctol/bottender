class BrowserEvent {
  constructor(rawEvent) {
    this._rawEvent = rawEvent;
  }

  get rawEvent() {
    return this._rawEvent;
  }

  get isMessage() {
    return true;
  }

  get message() {
    return this._rawEvent.message;
  }

  get isTextMessage() {
    return true;
  }
}

export default BrowserEvent;
