const handler = async context => {
  await context.sendText('Hello World');
};

module.exports = handler;
