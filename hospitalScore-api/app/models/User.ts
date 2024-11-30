import { Model, DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/database'

interface UserAttributers {
    id?: number,
    name: string,
    email: string,
    password: string
}

class User extends Model implements UserAttributers {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async getById(id: number): Promise<[boolean, User | string]> {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
            });
            if (!user) throw new Error("User not found");

            return [true, user];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async registerUser(name: string, email: string, password: string): Promise<[boolean, string]> {
        try {
            if (await User.findOne({ where: { email } })) throw new Error("Usuário já cadastrado");

            await User.create({ name, email, password });

            return [true, "Usuário cadastrado com sucesso."]

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unexpected error occurred"];
        }
    }

    public static async updateUser(id: number, data: object): Promise<[boolean, string]> {
        try {
            const verifyExists = await User.findByPk(id);
            if (!verifyExists) throw new Error("User not found for update");

            await User.update(data, { where: { id } });

            return [true, "Data updated successfully."];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }

    public static async authenticate(email: string) {
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) throw new Error("User not found");

            return [true, user];

        } catch (error: unknown) {
            if (error instanceof Error) {
                return [false, error.message];
            }
            return [false, "An unknown error occurred"];
        }
    }


}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users'
})

export default User;