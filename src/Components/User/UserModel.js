import { Schema, model } from 'mongoose';
import { ProdSchema as Product } from '../Product/ProductModel';

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    profile_img: { type: String, required: false, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

export default User;
