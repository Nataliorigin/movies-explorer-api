const allowedCors = [
  'https://movieManiaHub.nomoredomains.work',
  'http://movieManiaHub.nomoredomains.work',
  'http://api.movieManiaHub.nomoredomains.work',
  'https://api.movieManiaHub.nomoredomains.work',
  'https://api.moviemaniahub.nomoredomains.work/signin',
  'https://api.moviemaniahub.nomoredomains.work/signin',
  'https://api.moviemaniahub.nomoredomains.work/signup',
  'http://api.moviemaniahub.nomoredomains.work/signup',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
