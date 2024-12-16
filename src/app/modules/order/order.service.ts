import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const calculateTotalRevenueFromDB = async () => {
  const result = await Order.aggregate([
    // First stage - exclude isDeleted orders
    { $match: { isDeleted: false } },

    // Second stage - lookup product model for each item price
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'products',
      },
    },

    // Third stage - unwind products array products obj
    { $unwind: '$products' },

    // Fourth stage - calculate total price of orders
    {
      $group: {
        _id: null, // check all docs
        totalRevenue: { $sum: { $multiply: ['$products.price', '$quantity'] } },
      },
    },

    // Fifth stage - project only the totalRevenue value
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result[0];
};

export const OrderService = {
  createOrderIntoDB,

  calculateTotalRevenueFromDB,
};
