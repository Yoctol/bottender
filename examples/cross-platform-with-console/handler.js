const handler = async context => {
  await context.sendText(`Hello World. Platform: ${context.platform}`);
};

module.exports = handler;
