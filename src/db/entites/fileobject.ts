import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import db from '../index';
import Buckets from './buckets';

export interface IFileObject {
    id?: number;
    name: string;
    path: string;
    mimetype: string;
    status: string;
    bucket_id?: number;
    is_deleted?: boolean;
    createdBy: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IFileObjectInstance extends Model<IFileObject>, IFileObject { }
const FileObjects = db.sequelize.define<IFileObjectInstance>('fileobjects', {
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
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bucket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Buckets,
            key: 'id'
        }
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    }
},
    {
        freezeTableName: true,
        timestamps: true,
    });

export default FileObjects



