import bcrypt from 'bcryptjs/dist/bcrypt';
import jwt from 'jsonwebtoken';

class Global {
  generateToken(args) {
    return jwt.sign(args, process.env.SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });
  }

  comparePassword(input, stored) {
    return bcrypt.compareSync(input, stored);
  }
}

const GlobalFunction = new Global();
export default GlobalFunction;
