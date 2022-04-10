require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRouter from './Components/User/UserRouter';
import ProductRouter from './Components/Product/ProductRouter';
import check_cookie from './middlewares/cookie_checker';
import UserAPI from './Components/User/UserAPI';

export const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cookie_setter);
app.use(express.static(__dirname + '/public'));

(async function () {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if (db) console.log('connected to database successfully..!!');

    app.listen(port, (err) => {
      if (err) throw new Error(err);
      else console.log(`Server started successfully at port: ${port}`);
    });
  } catch (error) {
    console.trace(error);
    throw new Error(error.message);
  }
  console.log('Start Coding');
})();

app.get('/', (req, res) => {
  return res.json({ Hello: 'World' });
});

app.get('/user/all_users', UserAPI.getAllUsers);
app.post('/user/register', UserAPI.registration);
app.post('/user/login', UserAPI.logIn);

app.use(check_cookie);

app.use('/user', UserRouter);
app.use('/product', ProductRouter);
