import mongoose, { Document, model, Model } from 'mongoose';

interface IOrders extends Document {
  customerId: string;
  products: string[];
}

export { IOrders };
const orders = new mongoose.Schema<IOrders>({
  customerId: {
    type: String,
    required: true,
    length: 50,
  },
  products: [
    {
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      id: {
        type: String,
        required: true,
      },
    }],
});

export const Orders: Model<IOrders> = model('Orders', orders);
