export default class ClassifierHandler {
  constructor(classifier, threshold) {
    this._classifier = classifier;
    this._threshold = threshold;
    this._intentHandlers = [];
    this._unmatchedHandler = null;
  }

  onIntent(intent, handler) {
    this._intentHandlers.push({
      intent,
      handler: handler.build ? handler.build() : handler,
    });
    return this;
  }

  onUnmatched(handler) {
    this._unmatchedHandler = handler.build ? handler.build() : handler;
    return this;
  }

  build() {
    return async context => {
      if (context.event.isText) {
        const result = await this._classifier.predict(context.event.text);
        const intent = result.intents.sort((a, b) => {
          if (a.score > b.score) return -1;
          if (a.score < b.score) return 1;
          return 0;
        })[0];
        if (intent.score > this._threshold) {
          const intentHandler = this._findMatchIntentHandler(intent.name);
          if (intentHandler) {
            await intentHandler.handler(context, result);
          }
        } else if (this._unmatchedHandler) {
          await this._unmatchedHandler(context, result);
        }
      }
    };
  }

  _findMatchIntentHandler(intent) {
    return this._intentHandlers.find(
      intentHandler => intentHandler.intent === intent
    );
  }
}
