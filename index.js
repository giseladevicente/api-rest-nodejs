import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/productsRouter.js";
import authRouter from "./src/routes/authRouter.js"

const app = express();

app.use(cors()); 
app.use(express.json());
app.use("/api", productsRouter); 
app.use("/api/auth", authRouter);  


app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a API REST de Productos"})
})

app.use((req,res,next) => {
    res.status(404).json({ error: "Not Found"});
}); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); 
