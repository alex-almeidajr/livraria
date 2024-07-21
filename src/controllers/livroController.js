import { Long } from "mongodb";
import { autor } from "../models/Autor.js";
import { editora } from "../models/Editora.js";
import livro from "../models/Livro.js";

class LivroController {
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na requisição`});
        }
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro`});
        };
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const editoraEncontrada = await editora.findById(novoLivro.editora);
            const livroCompleto = { ...novoLivro, 
                                    autor: { ...autorEncontrado._doc},
                                    editora: { ...editoraEncontrada._doc }
                                  };
            const livroCriado = await livro.create(livroCompleto);

            res.status(201).json({ message: "Criado com sucesso!", livro: novoLivro });

        }catch (erro) {
           res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro `});
        }
    };
    
    static async atualizarLivro (req, res) {
        const atualizacao = req.body;
        try {
            const autorEncontrado = await autor.findById(atualizacao.autor);
            const editoraEncontrada = await editora.findById(atualizacao.editora);
            const livroAtualizado = { ...atualizacao, 
                                      autor: { ...autorEncontrado}, 
                                      editora: { ...editoraEncontrada}
                                    };
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, livroAtualizado);
            res.status(200).json({ message: "Livro atualizado!"});
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na atualização do livro`});
        };
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro excluído!"});
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na exclusão do livro`});
        };
    };

    static async listarLivrosPorAutor (req, res) {
        const autorId = req.query.autor;
        
        try {
            const autorLivro = await autor.findOne({ _id: autorId });

            if (!autorLivro){
                return res.status(404).json({ message: "Autor não encontrado!"});
            }

            const livros = await livro.find({ autor: autorLivro }).populate('autor');
            if (livros == "") {
                res.status(200).json({ message: "Nenhum livro encontrado com esse autor"});
            }else {
                res.status(200).json(livros);
            }
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na busca!`});
        }   
    };

    static async listarLivrosPorEditora (req, res) {
        const editoraId = req.query.editora;
        
        try {
            const editoraLivro = await autor.findOne({ _id: editoraId });

            if (!editoraLivro){
                return res.status(404).json({ message: "Autor não encontrado!"});
            }

            const livros = await livro.find({ editora: editoraLivro }).populate('editora');
            if (livros == "") {
                res.status(200).json({ message: "Nenhum livro encontrado com essa editora"});
            }else {
                res.status(200).json(livros);
            }
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na busca!`});
        }   
    };
};

export default LivroController;