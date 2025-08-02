const prisma = require('../prisma');

const getAllAlunos = async() => {

    return prisma.aluno.findMany({
        orderBy: {
            nome: 'DESC'
        }
    })
}

const getAlunoById = async(id_aluno) => {
    return prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    })
}

const addAluno = async(nome, data_nas, email) =>{
    return prisma.aluno.create({
        data:{
            nome: nome, 
            data_nas: data_nas,
            email: email
        }
    });
}

const updateAluno = async(id_aluno, nome, data_nas, email) => {
    const aluno = await getAlunoById(id_aluno);

    if(!aluno){
        throw new Error('Aluno não encontrado');
    }

    return prisma.update({
        where: {
            id_aluno: id_aluno
        },
        data: {
            nome: nome,
            data_nas: data_nas,
            email: email
        }
    })

}

const deleteAluno = async(id_aluno) => {
    const aluno = await getAlunoById(id_aluno);

    if(!aluno){
        throw new Error('Aluno não encontrado');
    }

    return prisma.aluno.delete({
        where: {
            id_aluno: id_aluno
        }
    })
}

module.exports = {
    getAllAlunos, 
    getAlunoById,
    addAluno,
    updateAluno,
    deleteAluno
}      

