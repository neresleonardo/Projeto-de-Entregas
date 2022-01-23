import express from "express";
import { routes } from "./routes"

const app = express()

// Usando o formato Json
app.use(express.json())
// Colocando as rotas 
app.use(routes)




app.listen(3000, () => {
    console.log("Correndo em 3000");  
})