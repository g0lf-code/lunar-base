import User from './UserModel';
import bcrypt from 'bcryptjs';
import GlobalFunction from '../Utils/GlobalFunctions';
import cookie_setter from '../../middlewares/cookie/cookieSetter';

const UserAPI = {
  getUser: async (req, res, next) => {
    try {
      const { id } = req?.params;
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error('Invalid ID');
      return res.status(200).json({ payload: user, message: 'User Fetched' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      if (!users) throw new Error('Error Fetching Users');
      return res
        .status(200)
        .json({ payload: users, message: `User's Fetched` });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },

  registration: async (req, res, next) => {
    try {
      const { email, name, password, address } = req?.body;
      if (!email || !password || !name)
        throw new Error('Email, Password & Name is required');
      if (password?.length < 6) throw new Error('Password is too short');
      const getUser = await User.findOne({ email });
      if (getUser) throw new Error('email already exists. Try different one.');

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const user = await User.create({ name, email, password: hash, address });
      if (user) delete user?.password;
      const u = user?.toJSON();
      const token = GlobalFunction.generateToken(u);

      return res
        .status(200)
        .json({ payload: u, token, message: 'User Registered' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },

  logIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error('Email & password is required');
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid Credentials');
      const payload = user.toJSON();
      if (!GlobalFunction.comparePassword(password, payload.password))
        throw new Error('Invalid Credentials');
      if (user) delete payload?.password;
      const token = GlobalFunction.generateToken(payload);
      cookie_setter(req, res, user);
      return res
        .status(200)
        .json({ payload, token, message: 'User Logged In' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
};

export default UserAPI;
