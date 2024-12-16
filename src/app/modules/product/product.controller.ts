import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { productValidationSchema } from './product.validation';

const getProducts = async (req: Request, res: Response) => {
  const filters = req.query;

  try {
    const result = await ProductService.getProductsFromDB(filters);

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to retrieve books',
      success: false,
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req?.params?.id;

  try {
    const result = await ProductService.getProductByIdFromDB(productId);

    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to retrieve book',
      success: false,
      error: error,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const zodParsedData = productValidationSchema.parse(product);

  try {
    const result = await ProductService.insertProductIntoDB(zodParsedData);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to create book',
      success: false,
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const updatePayload = req.body;

  try {
    // Check if product exists
    const isProductExists =
      await ProductService.getProductByIdFromDB(productId);

    if (!isProductExists) {
      res.status(404).json({
        message: 'Book not found!!',
        success: false,
        error: {},
      });

      return;
    }

    const result = await ProductService.updateProductIntoDB(
      productId,
      updatePayload,
    );

    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to update book',
      success: false,
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    // Check if product exists
    const isProductExists =
      await ProductService.getProductByIdFromDB(productId);

    if (!isProductExists) {
      res.status(404).json({
        message: 'Book not found!!',
        success: false,
        error: {},
      });

      return;
    }

    await ProductService.deleteProductFromDB(productId);

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'Failed to delete book',
      success: false,
      error: error,
    });
  }
};

export const ProductController = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
