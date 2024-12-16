import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({
    message: 'Invalid email format',
  }),
  product: z.string({ required_error: 'Product is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
  totalPrice: z.number({ required_error: 'Total price is required' }),
  isDeleted: z.boolean().default(false),
});
