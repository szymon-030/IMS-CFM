import Joi from 'joi';

const ProductValidation = Joi.object({
  id: Joi.string().required().min(1).max(100),
  quantity: Joi.number().min(1).positive().required(),
});
const CreateOrderValidation = Joi.object({
  customerId: Joi.string().required().min(1).max(100),
  products: Joi.array().items(ProductValidation),
});

export { CreateOrderValidation };
