import { TProduct } from './product.interface';
import { Product } from './product.model';

// Type definitions
type TFilters = {
  searchTerm?: string;
};

type TQuery = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const getProductsFromDB = async (filters: TFilters) => {
  const query: TQuery = {};
  const { searchTerm } = filters;

  if (searchTerm) {
    query['$or'] = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { category: { $eq: searchTerm } },
    ];
  }

  const result = await Product.find(query);
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

const insertProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};

const updateProductIntoDB = async (
  id: string,
  updatedData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return result;
};

// Initiate soft delete
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const ProductService = {
  getProductsFromDB,
  getProductByIdFromDB,
  insertProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
