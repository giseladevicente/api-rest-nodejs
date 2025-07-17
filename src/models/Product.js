import { db } from '../db/firebase.js';
import { collection, getDocs,doc, getDoc, addDoc} from 'firebase/firestore';

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

export const getProductById = async (id) => {
    try {
        const docRef = doc(productCollection, id); 
        const snapshot = await getDoc(docRef); 
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null; 
    } catch (error) {
        console.error(error);
    }   
};

export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(productCollection, productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error(error);
  }
};

