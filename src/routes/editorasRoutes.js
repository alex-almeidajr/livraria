import express from "express";
import EditoraController from "../controllers/editoraController.js";

const routes = express.Router();

routes.get("/editoras", EditoraController.listarEditoras);
routes.get("/editoras/:id", EditoraController.listarEditoraPorId);
routes.post("/editoras", EditoraController.cadastrarEditora);
routes.put("/editoras/:id", EditoraController.atualizarEditora);
routes.delete("/editoras/:id", EditoraController.excluirEditora);

export default routes;