import sleep from 'delay';

const methods = [
  'sendText',
  'sendMessage',
  'sendAttachment',
  'sendImage',
  'sendAudio',
  'sendVideo',
  'sendFile',
  'sendQuickReplies',
  'sendTemplate',
  'sendGenericTemplate',
  'sendButtonTemplate',
  'sendListTemplate',
  'sendOpenGraphTemplate',
  'sendMediaTemplate',
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
  'sendPicture',
  'sendURL',
  'sendCarouselContent',
];

export default options => context => {
  for (let i = 0; i < methods.length; i++) {
    if (context[methods[i]]) {
      const _method = context[methods[i]];
      /* eslint-disable func-names */
      context[methods[i]] = async function(...args) {
        if (this.typingOn) {
          await this.typingOn();
        }
        await sleep(options.delay);
        return _method.call(context, ...args);
      };

      context[`${methods[i]}WithDelay`] = async function(delay, ...args) {
        if (this.typingOn) {
          await this.typingOn();
        }
        await sleep(delay);
        return _method.call(context, ...args);
      };
      /* eslint-enable func-names */
    }
  }
};
