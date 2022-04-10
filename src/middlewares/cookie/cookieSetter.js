import { v4 } from 'uuid';
import Cookie from './cookie_schema';

export default function cookie_setter(req, res, user) {
  var cookie = req.cookies.__uid__;
  console.log(cookie);
  const uuid = v4();
  if (cookie === undefined) {
    res.cookie('__uid__', uuid, { maxAge: 900000, httpOnly: true });
    Cookie.setCookie({ uuid: uuid, userid: user._id });
    console.log('cookie created successfully');
  } else {
    console.log('cookie exists', cookie);
  }
}
