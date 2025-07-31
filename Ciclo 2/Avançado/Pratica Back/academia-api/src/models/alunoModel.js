const prisma = require('../prisma');

const getAllAlunos = async() => {
    return prisma.Aluno.findMany({
        orderBy: {
            nome: 'Desc'
        }
});
}

const getAlunoById = async(id) => {
    return prisma.Aluno.findUnique({
        where: {
            id: idS
        }
    });
}

const addAluno = async(nome, data_nascimento, email) =>{
    return prisma.Aluno.create({
        data: {
            nome: nome,
            data_nascimento: data_nascimento,
            email: email
        }
    });
}

const updateAluno = async(id_aluno,nome, data_nascimento, email) => {
    const aluno = await prisma.Aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    });

    if(!aluno) {
        throw new Error('Aluno não encontrado');
    }

    return prisma.Aluno.update({
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
    const aluno = await prisma.Aluno.findUnique({
        where: {
            id_aluno: id_aluno
        }
    });

    if(!aluno) {
        throw new Error('Aluno não encontrado');
    }

    return prisma.Aluno.delete({
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
