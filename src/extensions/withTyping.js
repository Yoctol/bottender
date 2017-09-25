const methods = [
  'sendText',
  'sendAttachment',
  'sendImage',
  'sendAudio',
  'sendVideo',
  'sendFile',
  'sendQuickReplies',
  'sendGenericTemplate',
  'sendButtonTemplate',
  'sendListTemplate',
  'sendReceiptTemplate',
  'sendAirlineBoardingPassTemplate',
  'sendAirlineCheckinTemplate',
  'sendAirlineItineraryTemplate',
  'sendAirlineFlightUpdateTemplate',
  'sendLocation',
  'sendSticker',
  'sendImagemap',
  'sendConfirmTemplate',
  'sendCarouselTemplate',
  'sendImageCarouselTemplate',
  'sendMessage',
  'sendPhoto',
  'sendDocument',
  'sendVoice',
  'sendVenue',
  'sendContact',
  'sendChatAction',
];

export default options => context => {
  for (let i = 0; i < methods.length; i++) {
    if (context[methods[i]]) {
      const _method = context[methods[i]];
      /* eslint-disable func-names */
      context[methods[i]] = function(...args) {
        this.typing(options.delay);
        return _method(...args);
      };

      context[`${methods[i]}WithDelay`] = function(delay, ...args) {
        this.typing(delay);
        return _method(...args);
      };
      /* eslint-enable func-names */
    }
  }
};
