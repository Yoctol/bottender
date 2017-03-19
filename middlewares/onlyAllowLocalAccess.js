const whitelist = [
  /^localhost:\d{4,5}$/,
  /^192\.168\.\d{1,3}\.\d{1,3}:\d{4,5}$/,
];

// eslint-disable-next-line consistent-return
const onlyAllowLocalAccess = () =>
  ({ request, response }, next) => {
    // eslint-disable-line consistent-return
    if (whitelist.some(re => re.test(request.header.host))) {
      return next();
    }
    response.status = 403;
    response.body = 'HTTP 403 Forbidden';
  };

export default onlyAllowLocalAccess;
