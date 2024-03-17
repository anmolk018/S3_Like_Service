import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import db from '../index';
import bcrypt from 'bcrypt';

export interface IUsers {
    id?: number;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
}

interface IUserInstance extends Model<IUsers>, IUsers { }
const Users = db.sequelize.define<IUserInstance>('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},
    {
        freezeTableName: true,
        timestamps: true,
    });


Users.beforeCreate(async (user: IUserInstance, options) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default Users


