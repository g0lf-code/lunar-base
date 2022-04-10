import Cookie from './cookie/cookie_schema';

export default function check_cookie(req, res, next) {
  console.log('checking cookie');
  var cookie = req.cookies.__uid__;
  if (cookie === undefined) {
    return res.status(401).send('User Unauthorized');
  } else {
    console.log('cookie exists bhosdi k', cookie);
    Cookie.findOne({ uuid: cookie }, function (err, data) {
      if (err || !data) {
        console.log('asshole');
        return res.status(301).send(' User Unauthorized fuck you');
      }
      next();
    });
  }
}
