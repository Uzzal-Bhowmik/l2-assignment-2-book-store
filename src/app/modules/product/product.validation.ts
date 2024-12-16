import { z } from 'zod';

export const productValidationSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required'),
  author: z
    .string({ required_error: 'Author is required' })
    .min(1, 'Author is required'),
  price: z.number({ required_error: 'Price is required' }),
  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    { required_error: 'Category is required' },
  ),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  quantity: z.number({ required_error: 'Quantity is required' }),
  inStock: z.boolean({ required_error: 'InStock is required' }),
  isDeleted: z.boolean().default(false),
});
