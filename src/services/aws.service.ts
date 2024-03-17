import Buckets, { IBucket } from '../db/entites/buckets';
import FileObjects, { IFileObject } from '../db/entites/fileobject';
import { promises as fsPromise, existsSync, mkdirSync, createWriteStream } from 'fs'
import path from 'path';
import { IFileInfo } from '../interface/aws.interface';


interface IAWSService {
    getObject(bucketName: string, fileId: number, createdBy: number): Promise<IFileObject>;
    putObject(bucketName: string, file: IFileInfo, createdBy: number): Promise<IFileObject>;
    deleteObject(bucketName: string, fileId: number, createdBy: number): Promise<[affectedCount: number]>;
    listObjects(bucketName: string | null, createdBy: number): Promise<IBucket[]>;
    listBuckets(createdBy: number): Promise<IBucket[]>;
    createBucket(bucketName: string, createdBy: number): Promise<IBucket>;
}

class AWSService implements IAWSService {
    public async createBucket(bucketName: string, createdBy: number): Promise<IBucket> {
        try {
            const bucketExist = await Buckets.findOne({
                where: { name: bucketName }
            });
            if (bucketExist) {
                throw new Error('bucket already exist.');
            }
            const bucketPath = path.join(__dirname, "..", "..", 'storage', bucketName);
            if (!existsSync(bucketPath)) {
                mkdirSync(bucketPath);
            }
            return await Buckets.create({
                name: bucketName,
                createdBy: createdBy
            });
        } catch (err) {
            throw err
        }
    }

    public async getObject(bucketName: string, fileId: number, createdBy: number): Promise<IFileObject> {
        try {
            const fileExist = await Buckets.findOne({
                include: [{
                    required: true,
                    model: FileObjects,
                    as: "fileobjects",
                    where: { id: fileId }
                }],
                where: { name: bucketName, createdBy: createdBy }
            });
            if (!fileExist || !fileExist.fileobjects?.length) {
                throw new Error('file not found.');
            }
            const stat = await fsPromise.stat(fileExist.fileobjects[0].path);
            return fileExist.fileobjects[0];
        } catch (e: any) {
            if (e.code == 'ENOENT' && e.syscall == "stat") {
                throw new Error('file not found.')
            }
            throw e;
        }
    }

    public async putObject(bucketName: string, file: IFileInfo, createdBy: number): Promise<IFileObject> {
        try {
            const fileExist = await Buckets.findOne({
                where: { name: bucketName, createdBy: createdBy }
            });
            if (!fileExist) {
                throw new Error('Invalid bucket name.');
            }
            const fileName = `[${Date.now()}]-${file.originalname}`;
            const bucketIds = fileExist.id;
            const filePath = path.join(__dirname, "..", "..", 'storage', bucketName, fileName);
            const fileObject = await FileObjects.create({
                name: fileName,
                path: filePath,
                mimetype: file.mimetype,
                status: 'pending',
                createdBy: createdBy,
                bucket_id: bucketIds
            })
            this.saveFile(createdBy, filePath, fileObject, file)
            return fileObject;
        } catch (e) {
            throw e;
        }
    }

    public async deleteObject(bucketName: string, fileId: number, createdBy: number): Promise<[affectedCount: number]> {
        try {
            const fileExist = await Buckets.findOne({
                include: [{ required: true, model: FileObjects, as: "fileobjects", where: { id: fileId, is_deleted: false } }],
                where: { name: bucketName, createdBy: createdBy }
            });
            if (!fileExist) {
                throw new Error('file not available.');
            }
            const filePath = fileExist.fileobjects![0].path
            fsPromise.unlink(filePath)
            return await FileObjects.update({ is_deleted: true }, { where: { id: fileId, createdBy: createdBy } })
        } catch (e) {
            throw e;
        }
    }

    public async listObjects(bucketName: string | null, createdBy: number): Promise<IBucket[]> {
        try {
            const bucketQuery: Record<string, any> = {
                include: [{ required: false, model: FileObjects, as: "fileobjects", where: { is_deleted: false } }],
                where: { createdBy: createdBy }
            }
            if (bucketName) {
                bucketQuery.where.name = bucketName
            }
            console.log(JSON.stringify(bucketQuery))
            const fileExist = await Buckets.findAll(bucketQuery);
            if (!fileExist) {
                throw new Error('bucket not found.');
            }
            return fileExist
        } catch (e) {
            throw e;
        }
    }

    public async listBuckets(createdBy: number): Promise<IBucket[]> {
        try {
            const list = await Buckets.findAll({
                include: [{ attributes: [], required: false, model: FileObjects, as: "fileobjects", where: { is_deleted: false } }],
                where: { createdBy: createdBy }
            });
            return list
        } catch (e) {
            throw e;
        }
    }

    private async saveFile(createdBy: number, filePath: string, fileObject: IFileObject, file: IFileInfo) {
        const writeStream = createWriteStream(filePath);

        writeStream.on('error', (error) => {
            console.error('Error saving file:', error);
            FileObjects.update({ status: "fail" }, { where: { id: fileObject.id, createdBy: createdBy } })
        });
        writeStream.on('finish', () => {
            FileObjects.update({ status: "success" }, { where: { id: fileObject.id, createdBy: createdBy } });
        });

        writeStream.write(file.buffer);
        writeStream.end();
    }

}

export default new AWSService();