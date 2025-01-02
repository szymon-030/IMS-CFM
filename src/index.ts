import express, { Express } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import helmet from 'helmet';

dotenv.config();

import './config/database';
import products from './routes/products';
import stock from './routes/stock';
import order from './routes/order';

const app: Express = express();
const port = process.env.PORT || 3000;
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use('/products', products);
app.use('/products', stock);
app.use('/orders', order);

app.use((err, res) => {
  res.status(404).json({
    error: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`[Express]: Server is running at http://localhost:${port}`);
});
