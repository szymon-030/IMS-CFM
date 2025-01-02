import { Router } from 'express';
import { Products } from '../models/products';
import { ErrorHandler, ValidatorError } from '../helper/error';
import { CreateProductValidation } from '../validators/products';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (err) {
    return ErrorHandler(err, res);
  }
});
router.post('/', async (req, res) => {
  const { error } = CreateProductValidation.validate(req.body);
  if (error) {
    return ValidatorError(error, res);
  }
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = new Products({
      name, description, price, stock,
    });
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);

  } catch (err) {
    return ErrorHandler(err, res);
  }
});
export default router;

