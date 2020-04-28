const { router, telegram, text, route } = require('bottender/router');

telegram.pollAnswer = function(action) {
  return route(
    context => context.event.rawEvent.pollAnswer !== undefined,
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
  const pollAnswer = context.event.rawEvent.pollAnswer;
  const pollId = pollAnswer.pollId;
  const user = pollAnswer.user;
  const optionIds = pollAnswer.optionIds;

  const username = user.username || `${user.firstName} ${user.lastName}`;
  const voteOptions = optionIds.map(id => pollOptions[id]).join(', ');

  let replyText = `${username} voted to ${voteOptions}.`;
  if (voteOptions.length === 0) {
    replyText = `${username} want to retract the vote.`;
  }

  const chatId = pollChatMappings[pollId];
  await context._client.sendMessage(chatId, replyText);
}

async function DefaultAction(context) {
  await context.sendText('please type /poll to create a new demo poll.');
}

async function DoNothingWhenPollUpdate() {}

module.exports = async function App(context) {
  return router([
    text(/\/poll/, NewPoll),
    telegram.poll(DoNothingWhenPollUpdate),
    telegram.pollAnswer(RecordPollAnswer),
    telegram.any(DefaultAction),
  ]);
};
