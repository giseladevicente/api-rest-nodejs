import * as Model from '../models/Product.js'

export const getAllProducts = async (req, res) => {
  const products = await Model.getAllProducts();
  res.json(products);
};

export const searchProducts = (req, res) => {
  res.json("Buscar productos");
};

export const getProductById = async (req, res) => {
    try {        
        const { id } = req.params;   
        const product = await Model.getProductById(id);
    
        if(!product) {
            res.status(404).json({ error: 'Producto no encontrado'});
        }
        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
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
