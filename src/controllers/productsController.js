import * as Model from '../models/Product.js'

export const getAllProducts = async (req, res) => {
  const products = await Model.getAllProducts();
  res.json(products);
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

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;

      if (!productData.name || !productData.price || !Array.isArray(productData.categories) || productData.categories.length === 0) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (name, price, categories)' });
      }
        const NewProduct = await Model.createProduct(productData);
        res.status(201).json(NewProduct);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No se enviaron datos para actualizar" });
    }
    
    const updatedProduct = await Model.updateProduct(id, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Model.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

