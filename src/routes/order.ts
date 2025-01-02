import { Router } from 'express';
import { Products } from '../models/products';
import { BadRequestError, ErrorHandler, ValidatorError } from '../helper/error';
import { Orders } from '../models/order';
import { CreateOrderValidation } from '../validators/order';

const router = Router();
type TProduct = {
  quantity: number, id: string
}
router.post('/', async (req, res) => {
  try {
    const { error } = CreateOrderValidation.validate(req.body);
    if (error) {
      return ValidatorError(error, res);
    }
    const { customerId, products }: {
      customerId: string,
      products: TProduct[]
    } = req.body;

    const foundProducts = await Products.find(
      { _id: products.map(e => e.id) }).exec();
    for (const ordered of products) {
      const dbProduct = foundProducts.find(e => e.id === ordered.id);

      if (!dbProduct) {
        return BadRequestError(`One or more products not found`, res);
      }
      if (ordered.quantity > dbProduct.stock) {
        BadRequestError(`Not enough stock for product ${dbProduct.name}`, res);
      }
      dbProduct.stock -= ordered.quantity;
    }

    for (const decreaseProduct of foundProducts) {
      await decreaseProduct.save();
    }
    console.log(products.map(e => ({ id: e.id, quantity: e.quantity })));
    const order = new Orders({
      customerId,
      products: products.map(e => ({ id: e.id, quantity: e.quantity })),
    });

    await order.save();

    return res.status(201).json(order);
  } catch (err) {
    return ErrorHandler(err, res);
  }
});
export default router;

