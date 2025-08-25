const prisma = require('../prisma');

const getTreinos = async ( aluno_id) => {
    return prisma.treino.findMany({
    where: {
            aluno_id:  aluno_id
        },
        orderBy: {
            data_inicio: 'desc'
        },
    }); 
}

const getTreinoById = async (id_treino) => {
    return prisma.treino.findUnique({
        where: {
            id_treino: id_treino
        }
    });
}

const addTreino = async (descricao,data_inicio,aluno_id) => {
    return prisma.treino.create({
        data: {
            descricao: descricao,
            data_inicio: new Date(data_inicio),
            aluno_id: Number(aluno_id)
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