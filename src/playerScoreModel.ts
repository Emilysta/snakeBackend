import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'snake.db',
})


class PlayerScore extends Model<InferAttributes<PlayerScore>, InferCreationAttributes<PlayerScore>>{
    declare id: CreationOptional<number>;
    declare playerName: string;
    declare playerScore: number;
}

PlayerScore.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        playerName: {
            type: new DataTypes.STRING(150),
            allowNull: false,
        },
        playerScore: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'playerScores'
    }
)

export async function initDatabase() {
    await sequelize.sync({ force: true });
}

export async function addPlayerScore(playerName: string, score: number) {
    const playerScore = await PlayerScore.create({
        playerName: playerName,
        playerScore: score,
    });
    return playerScore;
}


export async function getPlayerScores(page: number) {
    const playerScores = await PlayerScore.findAll({
        attributes: ['playerName', 'playerScore'],
        order: [
            ['playerScore', 'DESC'],
        ],
        offset: (page - 1) * 10,
        limit: 10
    });
    return playerScores;
}

export async function getPagesCount() {
    const count = await PlayerScore.count();
    return Math.floor(count / 10 + 1);
}

