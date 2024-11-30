import Hospital from './Hospital';
import User from './User';
import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '../config/database'



interface EvaluationAttributes {
    id?: number;
    idHospital: number;
    idUser: number;
    atendimento: number;
    limpeza: number;
    tempoEspera: number;
    qualidadeInstalacoes: number;
    textoLivre?: string;
}

class Evaluation extends Model<EvaluationAttributes> implements EvaluationAttributes {
    public id!: number;
    public idHospital!: number;
    public idUser!: number;
    public atendimento!: number;
    public limpeza!: number;
    public tempoEspera!: number;
    public qualidadeInstalacoes!: number;
    public textoLivre!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async register(idHospital: number, idUser: number, atendimento: number, limpeza: number, tempoEspera: number, qualidadeInstalacoes: number, textoLivre: string): Promise<[boolean, string]> {
        try {
            if (!await Evaluation.create({ idHospital, idUser, atendimento, limpeza, tempoEspera, qualidadeInstalacoes, textoLivre })) throw new Error("Error when registering the evaluation")

            return [true, "Evaluation successfully registered"];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }


}



Evaluation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idHospital: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'hospitais',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    atendimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    limpeza: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tempoEspera: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qualidadeInstalacoes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    textoLivre: {
        type: DataTypes.TEXT,
        allowNull: true
    }


}, {
    sequelize,
    tableName: 'score',
    timestamps: true
}
);

export default Evaluation;