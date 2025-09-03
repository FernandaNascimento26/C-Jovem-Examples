const prisma = require('../prisma');

const getAllAlunos = async() => {
    return prisma.aluno.findMany({
        orderBy: {
            id_aluno: 'desc'
        }
});
}

const getAlunoById = async(id_aluno) => {
    return prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    });
}

const addAluno = async(nome, data_nascimento, email) =>{
    return prisma.aluno.create({
        data: {
            nome: nome,
            data_nascimento: data_nascimento,
            email: email
        }
    });
}

const updateAluno = async(id_aluno,nome, data_nascimento, email) => {
    const aluno = await prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    });

    if(!aluno) {
        throw new Error('Aluno não encontrado');
    }

    return prisma.aluno.update({
        where: {
            id_aluno: id_aluno
        },
        data: {
            nome: nome,
            data_nascimento: data_nascimento,
            email: email
        }
    });
}


const deleteAluno = async(id_aluno) => {
    const aluno = await prisma.aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    });

    if(!aluno) {
        throw new Error('Aluno não encontrado');
    }

    return prisma.aluno.delete({
        where: {
            id_aluno: id_aluno
        }
    });
}

module.exports = {
    getAllAlunos,
    getAlunoById,
    addAluno,
    updateAluno,
    deleteAluno
};
