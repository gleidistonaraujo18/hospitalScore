import { Model, DataTypes, Optional } from 'sequelize'
import { Op } from 'sequelize';
import { sequelize } from '../config/database'
import Evaluation from './Evaluation';

interface HospitalAttributes {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phoneNumber?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


class Hospital extends Model implements HospitalAttributes {

    public id!: number;
    public name!: string;
    public address!: string;
    public city!: string;
    public state!: string;
    public postalCode!: string;
    public phoneNumber!: string;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async getAll(): Promise<[boolean, Hospital[] | string]> {
        try {
            const hospitais = await Hospital.findAll()
            if (!hospitais) throw new Error("There are no hospitals to display")

            return [true, hospitais]
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async createHospital(name: string, address: string, city: string, state: string, postalCode: string, phoneNumber: string, isActive: boolean): Promise<[boolean, string]> {
        try {
            if (await Hospital.findOne({ where: { name: name } })) throw new Error("Hospital already registered");

            if (!await Hospital.create({ name, address, city, state, postalCode, phoneNumber, isActive })) throw new Error("Error registering the hospital");

            return [true, "Hospital successfully registered"]

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }

    }

    public static async getHospitalsNotEvaluatedByUser(idUser: number): Promise<[boolean, Hospital[] | string]> {
        try {


            const evaluatedHospitals = await Evaluation.findAll({
                where: { idUser },
                attributes: ['idHospital'],
            });

            if (evaluatedHospitals.length === 0) {
                const allHospitals = await Hospital.findAll();
                return [true, allHospitals];
            }

            const evaluatedHospitalIds = evaluatedHospitals.map((evaluation) => evaluation.idHospital);

            const hospitalsNotEvaluated = await Hospital.findAll({
                where: {
                    id: {
                        [Op.notIn]: evaluatedHospitalIds
                    }
                }
            });

            if (hospitalsNotEvaluated.length === 0) {
                return [false, "The user has evaluated all hospitals"];
            }

            return [true, hospitalsNotEvaluated];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

}
Hospital.init(

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'hospitais',
        timestamps: true
    }
);

Hospital.hasMany(Evaluation, { foreignKey: 'idHospital', as: 'score' });


export default Hospital