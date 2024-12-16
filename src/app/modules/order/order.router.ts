import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/revenue', OrderController.getRevenue);

router.post('/', OrderController.createOrder);

export const OrderRouter = router;
