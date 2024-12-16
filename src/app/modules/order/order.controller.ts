import { Request, Response } from 'express';
import { ProductService } from '../product/product.service';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  const orderPayload = req.body;

  try {
    // Check if product exists
    const product = await ProductService.getProductByIdFromDB(
      orderPayload.product,
    );

    if (!product) {
      res.status(400).json({
        message: 'Product not found!!',
        success: false,
        error: {},
      });

      return;
    }

    // Check if insufficient stock
    if (product.quantity === 0 || orderPayload.quantity > product.quantity) {
      res.status(400).json({
        message: 'Insufficient stock!!',
        success: false,
        error: {
          message: `Quantity: ${orderPayload.quantity} is greater than current stock`,
        },
      });

      return;
    }

    // Create order
    const order = await OrderService.createOrderIntoDB(orderPayload);

    // Reduce product quantity once order is created
    const newProductQuantity = product?.quantity - 1;

    // Save updated product
    await ProductService.updateProductIntoDB(product._id.toString(), {
      quantity: newProductQuantity,
      inStock: newProductQuantity !== 0,
    });

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to create order',
      success: false,
      error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.calculateTotalRevenueFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to calculate revenue',
      success: false,
      error,
    });
  }
};

export const OrderController = { createOrder, getRevenue };
