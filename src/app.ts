import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/modules/product/product.router';
import { OrderRouter } from './app/modules/order/order.router';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running',
  });
});

export default app;
