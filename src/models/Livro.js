import mongoose from "mongoose";
//import {autores, autorSchema } from "./Autor.js"; usava com embredding

//usando o 
const livroSchema = new mongoose.Schema({
 id: { type: mongoose.Schema.Types.ObjectId },
 titulo: { type: String, required: true },
 editora: { type: String },
 preco: { type: Number },
 paginas: { type: Number },
 autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;


/*usando o embredding
const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema,
  },
  { versionKey: false },
);

*/