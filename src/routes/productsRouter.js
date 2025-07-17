import { Router } from "express";
import { getAllProducts, searchProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js"
const router = Router();

router.get('/products', getAllProducts);
router.get('/products/search', searchProducts); 
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct );

export default router; 