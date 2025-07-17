import * as Model from '../models/Product.js'

export const getAllProducts = async (req, res) => {
  const products = await Model.getAllProducts();
  res.json(products);
};

export const searchProducts = (req, res) => {
  res.json("Buscar productos");
};

export const getProductById = (req, res) => {
  res.json(`Obtener producto con ID: ${req.params.id}`);
};

export const createProduct = (req, res) => {
  res.json("Crear nuevo producto");
};

export const updateProduct = (req, res) => {
  res.json(`Actualizar producto con ID: ${req.params.id}`);
};

export const deleteProduct = (req, res) => {
  res.json(`Eliminar producto con ID: ${req.params.id}`);
};
