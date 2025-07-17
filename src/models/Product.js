import { db } from '../db/firebase.js';
import { collection, getDocs} from 'firebase/firestore';

const productCollection = collection(db, "products");

export const getAllProducts = async() => {
    try {
        const snapshot = await getDocs(productCollection);
        const products = snapshot.docs.map((doc) => ({ 
            id: doc.id,
            ...doc.data(),
        }));
        return products;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

