const prisma = require('../prisma');

const getTreinosByAluno = async (id_aluno) => {

    const treinos = await prisma.treino.findMany({
        where: {
            id_aluno: id_aluno
        },
        orderBy: {
            data_inicio: 'desc'
        }
    });
}

const getTreinoById = async (id_treino) => {

    const treino = await prisma.treino.findUnique({
        where: {
            id_treino: id_treino
        }
    });
}

const addTreino = async (descricao,data_inicio,id_aluno) => {

    return await prisma.treino.create({
        data: {
            descricao: descricao,
            data_inicio: new Date(data_inicio),
            id_aluno: Number(id_aluno)
        }
    });
}

const updateTreino = async (id_treino, descricao, data_inicio) => {
    const treino = getTreinoById(id_treino);
    if (!treino) {
        throw new Error('Treino não encontrado');
    }
    return prisma.treino.update({
        where: {
            id_treino: Number(id_treino)
        },
        data: {
            descricao: descricao,
            data_inicio: new Date(data_inicio)
        }
    });
}

const deleteTreino = async (id_treino) => {
    const treino = await prisma.treino.findUnique({
        where: {
            id_treino: Number(id_treino)
        }
    });
    if (!treino) {
        throw new Error('Treino não encontrado');
    }
    return prisma.treino.delete({
        where: {
            id_treino: Number(id_treino)
        }
    });
}

module.exports = {
    getTreinosByAluno,
    getTreinoById,
    addTreino,
    updateTreino,
    deleteTreino
}