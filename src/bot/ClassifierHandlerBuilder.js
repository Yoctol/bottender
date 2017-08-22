export default class ClassifierHandlerBuilder {
  constructor(classifier, threshold) {
    this._classifier = classifier;
    this._threshold = threshold;
    this._intentHandlers = [];
    this._unmatchedHandler = null;
  }

  onIntent(intent, handler) {
    this._intentHandlers.push({
      intent,
      handler,
    });
    return this;
  }

  onUnmatched(handler) {
    this._unmatchedHandler = handler;
    return this;
  }

  build() {
    return async context => {
      if (context.event.isTextMessage) {
        const result = await this._classifier.predict(
          context.event.message.text
        );
        const intent = result[0];
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
