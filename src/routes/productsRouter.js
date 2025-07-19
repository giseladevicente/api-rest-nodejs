import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js"
import { auth } from "../middlewares/authMiddleware.js"

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', auth, createProduct);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct );

export default router; 