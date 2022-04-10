import { Router } from 'express';
import cookie_setter from '../../middlewares/cookie/cookieSetter';
import UserAPI from './UserAPI';

const UserRouter = Router();

UserRouter.get('/:id', UserAPI.getUser);
// UserRouter.get('/all_users', UserAPI.getAllUsers);
// UserRouter.post('/register', UserAPI.registration);
// UserRouter.post('/login', UserAPI.logIn);

export default UserRouter;
