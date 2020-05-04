const session = {};

function createSession(data) {
  const key = Math.random()
    .toString(36)
    .substr(2, 10);
  session[key] = data;
  return key;
}

function getSession(key) {
  return session[key];
}

module.exports = {
  getSession,
  createSession,
};
