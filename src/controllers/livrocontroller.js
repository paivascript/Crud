import livro from "../models/Livro.js"
//import {autor}  from "../models/Autor.js" usava com embredding

class LivroController {

    //usando reference
     static async listarLivros (req, res) {
    try {
        const listaLivros = await livro.find({}).populate("autor").exec();
        res.status(200).json(listaLivros);
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
    };

    /* antiga forma com o embredding
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch(erro){
            res.status(500).json({message:`${erro.message} falha na requisição`})
        }

    }
     */
    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }catch(erro){
            res.status(500).json({message:`${erro.message} falha da requisição do livro `})
        }

    }

    //usando o reference
     static async cadastrarLivro (req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
    }
    /*usando embredding

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
        const autorEncontrado = await autor.findById(novoLivro.autor);
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
        } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
    } */
        
    
    
      static async atualizarLivro(req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message:"livro atualizado"});
        }catch(erro){
            res.status(500).json({message:`${erro.message} falha da requisição do livro `})
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(204).json({message:"livro deletado"});
        }catch(erro){
            res.status(500).json({message:`${erro.message} falha ao deletar o livro `})
        }
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }
}

export default LivroController