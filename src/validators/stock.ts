import Joi from 'joi';

const StockValidation = Joi.object({
  number: Joi.number().min(1).optional().positive(),
});

export { StockValidation };
