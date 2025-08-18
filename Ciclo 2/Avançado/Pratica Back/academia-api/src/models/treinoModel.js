const prisma = require('../prisma');

const getTreinos = async (id_aluno) => {
    return prisma.treino.findMany({
    where: {
            id_aluno: Number(id_aluno)
        },
        orderBy: {
            data_inicio: 'desc'
        },
    }); 
}

const getTreinoById = async (id_treino) => {
    return prisma.treino.findUnique({
        where: {
            id_treino: Number(id_treino)
        }
    });
}

const addTreino = async (id_aluno,descricao,data_inicio) => {
    return prisma.treino.create({
        data: {
            id_aluno: Number(id_aluno),
            descricao: descricao,
            data_inicio: new Date(data_inicio)
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
    getTreinos,
    getTreinoById,
    addTreino,
    updateTreino,
    deleteTreino

}