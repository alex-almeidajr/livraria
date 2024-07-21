import { editora } from "../models/Editora.js";

class EditoraController {
    static async listarEditoras (req, res) {
        try {
            const listaEditoras = await editora.find({});
            res.status(200).json(listaEditoras);
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na requisição`});
        }
    };

    static async listarEditoraPorId (req, res) {
        try {
            const id = req.params.id;
            const editoraEncontrado = await editora.findById(id);
            res.status(200).json(editoraEncontrado);
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na requisição da editora`});
        };
    };

    static async cadastrarEditora (req, res) {
        try {
            const novaEditora = await editora.create(req.body);
            res.status(201).json({ message: "Criada com sucesso!", editora: novaEditora });
        }catch (erro) {
           res.status(500).json({ message: `${erro.message} - Falha ao cadastrar editora `});
        }
    }
    
    static async atualizarEditora (req, res) {
        try {
            const id = req.params.id;
            await editora.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Editora atualizada!"});
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na atualização da editora`});
        };
    };

    static async excluirEditora (req, res) {
        try {
            const id = req.params.id;
            await editora.findByIdAndDelete(id);
            res.status(200).json({ message: "Editora excluída!"});
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha na exclusão da editora`});
        };
    };
};

export default EditoraController;