import sleep from 'delay';
import warning from 'warning';
import omit from 'lodash/omit';

const methodMap = {
  // method name, arguments length (includes options)
  messenger: [
    ['sendText', 2],
    ['sendMessage', 2],
    ['sendAttachment', 2],
    ['sendImage', 2],
    ['sendAudio', 2],
    ['sendVideo', 2],
    ['sendFile', 2],
    ['sendQuickReplies', 3], // FIXME: remove later
    ['sendTemplate', 2],
    ['sendGenericTemplate', 2],
    ['sendButtonTemplate', 3],
    ['sendListTemplate', 3],
    ['sendOpenGraphTemplate', 2],
    ['sendMediaTemplate', 2],
    ['sendReceiptTemplate', 2],
    ['sendAirlineBoardingPassTemplate', 2],
    ['sendAirlineCheckinTemplate', 2],
    ['sendAirlineItineraryTemplate', 2],
    ['sendAirlineFlightUpdateTemplate', 2],
  ],
  line: [
    // LINE
    ['sendText', 2],
    ['sendImage', 3],
    ['sendVideo', 3],
    ['sendAudio', 3],
    ['sendLocation', 2],
    ['sendSticker', 3],
    ['sendImagemap', 3],
    ['sendButtonTemplate', 3],
    ['sendConfirmTemplate', 3],
    ['sendCarouselTemplate', 3],
    ['sendImageCarouselTemplate', 3],
    ['replyText', 2],
    ['replyImage', 3],
    ['replyVideo', 3],
    ['replyAudio', 3],
    ['replyLocation', 2],
    ['replySticker', 3],
    ['replyImagemap', 3],
    ['replyButtonTemplate', 3],
    ['replyConfirmTemplate', 3],
    ['replyCarouselTemplate', 3],
    ['replyImageCarouselTemplate', 3],
    ['pushText', 2],
    ['pushImage', 3],
    ['pushVideo', 3],
    ['pushAudio', 3],
    ['pushLocation', 2],
    ['pushSticker', 3],
    ['pushImagemap', 3],
    ['pushButtonTemplate', 3],
    ['pushConfirmTemplate', 3],
    ['pushCarouselTemplate', 3],
    ['pushImageCarouselTemplate', 3],
  ],
  slack: [['sendText', 2], ['postMessage', 2]],
  telegram: [
    ['sendText', 2],
    ['sendMessage', 2],
    ['sendPhoto', 2],
    ['sendAudio', 2],
    ['sendDocument', 2],
    ['sendSticker', 2],
    ['sendVideo', 2],
    ['sendVoice', 2],
    ['sendVideoNote', 2],
    ['sendMediaGroup', 2],
    ['sendLocation', 2],
    ['sendVenue', 2],
    ['sendContact', 2],
  ],
  viber: [
    ['sendText', 2],
    ['sendMessage', 2],
    ['sendPicture', 2],
    ['sendVideo', 2],
    ['sendFile', 2],
    ['sendContact', 2],
    ['sendLocation', 2],
    ['sendURL', 2],
    ['sendSticker', 2],
    ['sendCarouselContent', 2],
  ],
};

export default options => context => {
  const methods = methodMap[context.platform];
  if (!methods) return;

  for (let i = 0; i < methods.length; i++) {
    const [method, len] = methods[i];
    if (context[method]) {
      const _method = context[method];
      /* eslint-disable func-names */
      context[method] = async function(...args) {
        const methodOptions = args[len - 1];

        const delay =
          methodOptions &&
          typeof methodOptions === 'object' &&
          typeof methodOptions.delay === 'number'
            ? methodOptions.delay
            : options.delay;

        if (methodOptions) {
          args[len - 1] = omit(methodOptions, ['delay']);
        }

        if (this.typingOn) {
          await this.typingOn();
        }

        await sleep(delay);

        return _method.call(context, ...args);
      };

      context[`${method}WithDelay`] = async function(delay, ...args) {
        warning(
          false,
          `\`${method}WithDelay\` is deprecated. Use ${method} with \`options.delay\` instead`
        );
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
