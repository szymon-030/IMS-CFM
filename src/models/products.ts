import mongoose, { Document, model, Model } from 'mongoose';

interface IProducts extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export { IProducts };
const products = new mongoose.Schema<IProducts>({
  name: {
    type: String,
    required: true,
    length: 50,
  },
  description: {
    type: String,
    required: true,
    length: 50,
  },
  price: {
    type: Number,
    required: true,
    length: 50,
  },
  stock: {
    type: Number,
    required: true,
    length: 50,
  },
});

export const Products: Model<IProducts> = model('Products', products);
