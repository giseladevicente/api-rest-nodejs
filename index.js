import "dotenv/config";
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a API REST Firestore - Proyecto Final Talento Tech"})
})

app.use((req,res,next) => {
    res.status(404).json({ error: "Not Found"});
}); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); 
