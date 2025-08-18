const e = require('express');
const {getTreinos,getTreinoById,addTreino,updateTreino,deleteTreino} = require('../models/treinoModel');

const getAllTreinosByAluno = async (req, res) => {
    const aluno_id = parseInt(req.params.aluno_id);
    try {

    const treinos = await getTreinos(aluno_id);
    res.status(200).json(treinos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Erro ao buscar treinos' });
    }
}

const getTreinoByIdHandler = async (req, res) => {
    const id_treino = parseInt(req.params.id_treino);
    try {
        const treino = await getTreinoById(id_treino);
        if (!treino) {
            return res.status(404).json({ error: 'Treino não encontrado' });
        }
        res.status(200).json(treino);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erro ao buscar treino' });
    }
}

const addTreinoHandler = async (req, res) => {
    const {descricao,data_inicio,aluno_id} = req.body;
    if (!aluno_id || !descricao) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    if (descricao.trim().length < 20) {
        return res.status(400).json({ error: 'Descrição deve ter pelo menos 20 caracteres' });
    }
    try {
        const novoTreino = await addTreino(descricao, data_inicio, aluno_id);
        res.status(201).json(novoTreino);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erro ao adicionar treino' });
    }
}

const updateTreinoHandler = async (req, res) => {
    const id_treino = parseInt(req.params.id_treino);
    const {descricao, data_inicio} = req.body;
    console.log(req.body);
    if (!descricao) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }
    if (descricao.trim().length < 20) {
        return res.status(400).json({ error: 'Descrição deve ter pelo menos 20 caracteres' });
    }
    try {
        const treinoAtualizado = await updateTreino(id_treino, descricao, data_inicio);
        console.log(treinoAtualizado);
        res.status(200).json(treinoAtualizado);
    } catch (error) {
        if (error.message === 'Treino não encontrado') {
            return res.status(404).json({ error: 'Treino não encontrado' });
        }
        res.status(500).json({ error: error.message || 'Erro ao atualizar treino' });
    }
}

const deleteTreinoHandler = async (req, res) => {
    const id_treino = parseInt(req.params.id_treino);
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