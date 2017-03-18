const logMessage = ({ db }) =>
  async ({ request }, next) => {
    const msg = request.body.entry[0].messaging[0];
    const message = JSON.stringify(msg);
    await db.insert({ text: message, alien_id: null }).into('messages');
    return next();
  };

export default logMessage;
