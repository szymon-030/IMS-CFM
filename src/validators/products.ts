import Joi from 'joi';

const CreateProductValidation = Joi.object({
  name: Joi.string().required().min(1).max(50),
  stock: Joi.number().min(0).positive().required(),
  price: Joi.number().required().min(1).positive(),
  description: Joi.string().required().min(1).max(50),
});

export { CreateProductValidation };
