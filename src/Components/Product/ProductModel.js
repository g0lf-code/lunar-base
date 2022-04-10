import { Schema, model } from 'mongoose';

export const ProdSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    sku_id: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true },
    weight_unit: { type: String, required: true, trim: true, default: 'gram' },
    product_img: { type: String, required: false, trim: true },
    description: { type: String, required: false, trim: true },
    currency: {
      type: String,
      required: true,
      trim: true,
      default: 'INR',
      uppercase: true,
    },
  },
  { timestamps: true }
);

const Product = model('Product', ProdSchema);

export default Product;
