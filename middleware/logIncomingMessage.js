import resolveDatabase from '../database/resolve';

const logIncomingMessage = () =>
  async ({ request }, next) => {
    const msg = request.body.entry[0].messaging[0];
    const message = JSON.stringify(msg);
    const db = await resolveDatabase();
    await db.insert({ text: message, alien_id: null }).into('messages');
    return next();
  };

export default logIncomingMessage;
