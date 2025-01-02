import express, { Router } from 'express';
import { Products } from '../models/products';
import { StockManagement } from '../enum/stock';
import { BadRequestError, ErrorHandler, ValidatorError } from '../helper/error';
import { StockValidation } from '../validators/stock';

const router = Router();

const ValidationMiddleware = (
  req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = StockValidation.validate(req.body);
  if (error) {
    return ValidatorError(error, res);
  }
  next();
};

router.post('/:id/restock', ValidationMiddleware, async (req, res) => {
  return FindAndUpdateProduct(req.params.id, res, StockManagement.increse,
    req.body.number ?? 1);
});
router.post('/:id/sell', ValidationMiddleware, async (req, res) => {
  return FindAndUpdateProduct(req.params.id, res, StockManagement.decrease,
    req.body.number ?? 1);
});

const FindAndUpdateProduct = async (
  id: string, res: express.Response, action: StockManagement,
  diffNumber: number = 1) => {
  try {
    const product = await Products.findById(id).exec();
    if (!product) {
      return BadRequestError('Product not found', res);
    }
    if (action === StockManagement.decrease) {
      if (product.stock < 1) {
        return BadRequestError('Not enough stock to decrease', res);
      }
      product.stock -= diffNumber;
    }
    if (action === StockManagement.increse) {
      product.stock += diffNumber;
    }

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    return ErrorHandler(err, res);
  }
};
export default router;

