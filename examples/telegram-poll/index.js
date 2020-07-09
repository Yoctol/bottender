const { router, telegram, text, route } = require('bottender/router');

telegram.pollAnswer = function pollAnswer(action) {
  return route(
    (context) => context.event.rawEvent.pollAnswer !== undefined,
    action
  );
};

const pollOptions = ['🍔', '🍕', '🌮', '🍱'];

const pollChatMappings = {};

async function NewPoll(context) {
  const message = await context.sendPoll(
    'Which one is your favorite food?',
    pollOptions,
    {
      isAnonymous: false,
      allowsMultipleAnswers: true,
    }
  );
  pollChatMappings[message.poll.id] = message.chat.id;
}

async function RecordPollAnswer(context) {
  const { pollId, user, optionIds } = context.event.rawEvent.pollAnswer;
  const username = user.username || `${user.firstName} ${user.lastName}`;
  const voteOptions = optionIds.map((id) => pollOptions[id]).join(', ');

  const replyText =
    voteOptions.length === 0
      ? `${username} want to retract the vote.`
      : `${username} voted to ${voteOptions}.`;

  const chatId = pollChatMappings[pollId];
  await context.client.sendMessage(chatId, replyText);
}

async function DefaultAction(context) {
  await context.sendText('please type /poll to create a new demo poll.');
}

async function DoNothing() {}

module.exports = async function App(context) {
  return router([
    text(/\/poll/, NewPoll),
    telegram.poll(DoNothing),
    telegram.pollAnswer(RecordPollAnswer),
    telegram.any(DefaultAction),
  ]);
};
