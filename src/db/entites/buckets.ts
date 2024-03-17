import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import db from '../index';
import FileObjects, { IFileObject } from './fileobject';

export interface IBucket {
    id?: number;
    name: string;
    createdBy: number;
    fileobjects?: IFileObject[],
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBucketInstance extends Model<IBucket>, IBucket { }
const Buckets = db.sequelize.define<IBucketInstance>('buckets', {
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

Buckets.hasMany(FileObjects, { as: 'fileobjects', foreignKey: 'bucket_id' });

export default Buckets


