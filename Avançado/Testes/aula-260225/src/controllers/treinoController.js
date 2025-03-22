const Treino = require("../models/treinoModel");
const { treino } = require("../prisma");

exports.listarTreinos = async(req, res) => {
    try {
        const treinos = await Treino.listarTreinos();
        res.status(200).json(treinos);
    } catch (error) {
        console.error("Deu erroooo!", error);
        res.status(500).json({error: error.message || "Deu erro na hora de Listar"});
    }
}

exports.criarTreinos = async(req, res) => {
    try {
        const {descricao, dias_semana} = req.body;
        const novoTreino = await Treino.criarTreinos(descricao, dias_semana);
        console.log(novoTreino);
        res.status(201).json(novoTreino);
    } catch (error) {
        console.error("Deu erroooo!", error);
        res.status(500).json({error: error.message || "Deu erro na hora de Criar"});
    }
}