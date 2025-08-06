const { getAllAlunos, getAlunoById,addAluno,updateAluno,deleteAluno} = require('../models/alunoModel');

const getAllAlunosHandler = async(req, res) =>{
    try{
        const alunos = await getAllAlunos();

        res.status(200).json(alunos);
    }
    catch(error){
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
}

const getAlunoByIdHandler = async(req, res) => {
    const {id_aluno} = req.params;

    try{

        const aluno = await getAlunoById(id_aluno);

        if(!aluno){
            return res.status(404).json({ error: 'Aluno não encontrado'});
        }

        res.status(200).json(aluno);
    }

    catch(error){
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
}

const addAlunoHandler = async(req, res) => {
    const{nome, data_nas, email} = req.body;

    if(!nome || !email){
        return res.status(400).json({ error: 'Nome e email são obrigatórios'});
    }

    try{
        const novoAluno = await addAluno(nome, data_nas, email);

        res.status(201).json(novoAluno);
    }

    catch(error){
        res.status(500).json({ error: 'Erro ao adicionar aluno' });
    }

}

const updateAlunoHandler = async(req, res) => {
    const id_aluno = parseInt(req.params.id_aluno);
    const {nome, data_nas, email} = req.body;

    if(!nome || !email){
        return res.status(400).json({ error: 'Nome e email são obrigatórios'});
    }

    try{
        const alunoAtualizado = await updateAluno(id_aluno, nome, data_nas, email);

        res.status(200).json(alunoAtualizado);
    }
    catch(error){
        if(error.message === 'Aluno não encontrado'){
            return res.status(404).json({ error: 'Aluno não encontrado'});
        }
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }

}

const deleteAlunoHandler = async(req, res) => {
    const id_aluno = parseInt(req.params.id_aluno);

    try{
        await deleteAluno(id_aluno);

        res.status(204).send();
    }
    catch(error){
        if(error.message === 'Aluno não encontrado'){
            return res.status(404).json({ error: 'Aluno não encontrado'});
        }
        res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
}

module.exports = {
    getAllAlunosHandler,
    getAlunoByIdHandler,
    addAlunoHandler,
    updateAlunoHandler,
    deleteAlunoHandler
}









