import express from 'express';

const ErrorHandler = <T>(error: T, res: express.Response) => {
  console.log(error);
  res.status(500).json({
    error,
  });
};
const ValidatorError = (
  error: { details: { message: string }[] }, res: express.Response) => {
  return res.status(400).json({ message: error.details[0].message });
};

const BadRequestError = (error: string, res: express.Response) => {
  return res.status(400).json({ message: error });
};

export { ErrorHandler, ValidatorError, BadRequestError };
