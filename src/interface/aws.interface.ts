import { IFileObject } from "../db/entites/fileobject";

export interface IFileInfo {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    filename: string;
    buffer: Buffer;
}

export interface IBucketObject {
    id: number;
    name: string;
    fileobjects: IFileObject[]
    createdBy: number;
    createdAt: Date;
    updateAt: Date;
}