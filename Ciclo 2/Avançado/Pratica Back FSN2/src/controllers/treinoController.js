const {getTreinosByAluno,getTreinoById,addTreino,updateTreino,deleteTreino} = require('../models/treinoModel')

const getAllTreinosByAluno = async(req,res) =>{

    const id_aluno = parseInt(req.params.id_aluno)
    try{
        const treinos = await getTreinosByAluno(id_aluno)
        res.status(200).json(treinos)
    }
    catch(error){
        res.status(500).json({error:'Erro ao buscar treinos!'})
    }
}

const getTreinoByIdHandler = async(req,res) =>{
    const id_treino = parseInt(req.params.id_treino)
    try{
        const treino = await getTreinoById(id_treino)
        if(!treino){
            res.status(404).json({error:'Treino não encontrado'})
        }
        res.status(200).json(treino)
    }catch(error){
        res.status(500).json({error:'Erro ao buscar treino!'})
}
}

const addTreinoHandler = async(req,res) =>{
    const {descricao,data_inicio,id_aluno} = req.body
    if(!descricao || id_aluno){
        res.status(400).json({error:'Dados incompletos!'})
    }
    if(descricao.trim().length < 20){
        res.status(400).json({error:'Descrição deve ter ao menos 20 caracteres!'})
    } 
    try{
        const novotreino = await addTreino(descricao,data_inicio,id_aluno)
        res.status(201).json(novotreino)
    }catch(error){
        res.status(500).json({error:'Erro ao adicionar o treino'})
    }
}

const updateTreinoHandler = async(req,res) =>{
    const id_treino = parseInt(req.params.id_treino)
    const {descricao,data_inicio} = req.body

    if(!descricao){
        res.status(400).json({error:'Descrição não fornecida!'})
    }
    if(descricao.trim().length < 20){
        res.status(400).json({error:'Descrição deve ter ao menos 20 caracteres!'})
    }
    try{
        const treinoAtualizado = await updateTreino(id_treino,descricao,data_inicio)
        res.status(200).json(treinoAtualizado)
    }
    catch(error){
        if(error.message === 'Treino não encontrado'){
            res.status(404).json({error:'Treino não encontrado'})
        }
        res.status(500).json({error:'Erro ao atualizar'})
    }
}

const deleteTreinoHandler = async(req,res) => {
    const id_treino = parseInt(req.params.id_treino)
    try{
        await deleteTreino(id_treino)
        res.status(204).send()
    }
    catch(error){
        if(error.message === 'Treino não encontrado'){
            res.status(404).json({error:'Treino não encontrado'})
        }
        res.status(500).json({error:'Erro ao deletar!'})
    }
}

module.exports = {
    getAllTreinosByAluno,
    getTreinoByIdHandler,
    addTreinoHandler,
    updateTreinoHandler,
    deleteTreinoHandler
}