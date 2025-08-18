const {getTreinos,getTreinoById,addTreino,updateTreino,deleteTreino} = require('../models/treinoModel');

const getAllTreinosByAluno = async (req, res) => {
    const {id_aluno}= parseInt(req.params);
    try {

    const treinos = await getTreinos(id_aluno);
    res.status(200).json(treinos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar treinos' });
    }
}

const getTreinoByIdHandler = async (req, res) => {
    const {id_treino} = parseInt(req.params);
    try {
        const treino = await getTreinoById(id_treino);
        if (!treino) {
            return res.status(404).json({ error: 'Treino não encontrado' });
        }
        res.status(200).json(treino);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar treino' });
    }
}

const addTreinoHandler = async (req, res) => {
    const {id_aluno, descricao, data_inicio} = req.body;
    if (!id_aluno || !descricao) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    if (descricao.trim().length < 20) {
        return res.status(400).json({ error: 'Descrição deve ter pelo menos 20 caracteres' });
    }
    try {
        const novoTreino = await addTreino(id_aluno, descricao, data_inicio);
        res.status(201).json(novoTreino);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erro ao adicionar treino' });
    }
}

const updateTreinoHandler = async (req, res) => {
    const {id_treino} = parseInt(req.params);
    const {descricao, data_inicio} = req.body;
    if (!descricao) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    if (descricao.trim().length < 20) {
        return res.status(400).json({ error: 'Descrição deve ter pelo menos 20 caracteres' });
    }
    try {
        const treinoAtualizado = await updateTreino(id_treino, descricao, data_inicio);
        res.status(200).json(treinoAtualizado);
    } catch (error) {
        if (error.message === 'Treino não encontrado') {
            return res.status(404).json({ error: 'Treino não encontrado' });
        }
        res.status(500).json({ error: 'Erro ao atualizar treino' });
    }
}

const deleteTreinoHandler = async (req, res) => {
    const {id_treino} = parseInt(req.params);
    try {
        await deleteTreino(id_treino);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Treino não encontrado') {
            return res.status(404).json({ error: 'Treino não encontrado' });
        }
        res.status(500).json({ error: 'Erro ao deletar treino' });
    }
}

module.exports = {
    getAllTreinosByAluno,
    getTreinoByIdHandler,
    addTreinoHandler,
    updateTreinoHandler,
    deleteTreinoHandler
};