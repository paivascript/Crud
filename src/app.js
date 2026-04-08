import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js"

const conexao =  await conectaNaDatabase();

conexao.on("error",(erro) => {
    console.error("erro de conexão", erro)
})

conexao.once("open",() =>{
    console.log("conexao com banco feita com sucesso")
})

const app = express();
app.use(express.json());


app.get("/", (req, res) =>{
    res.status(200).send("Curso de Node.js");
})

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
})

app.get("/livros/:id", (req,res) => {
    const index = buscarLivro(req.params.id)     
    res.status(200).json(livros[index])
})

app.put("/livros/:id",(req,res) => {
    const index = buscarLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros);
})

app.post("/livros", (req,res) =>{
    livros.push(req.body)
    res.status(201).send("Livro cadastrado com sucesso!")

})

export default app;

//mongodb+srv://admin:xVCe3X5QF2lQVXjU@cluster0.kiutxr6.mongodb.net/?appName=Cluster0