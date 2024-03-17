import { Request, Response, NextFunction } from 'express';
import AWSService from '../services/aws.service';
import { promises as fsPromise, createReadStream, createWriteStream } from 'fs'
export class AwsController {
    public static async createBucket(req: Request, res: Response, next: NextFunction) {
        try {
            const { bucketName = null, createdBy = null } = req.query;
            if (!bucketName) {
                return res.status(400).json({
                    message: "bucket name missing.",
                })
            }
            if (!createdBy) {
                return res.status(400).json({
                    message: "invalid user.",
                })
            }
            const result = await AWSService.createBucket(bucketName as string, Number(createdBy))
            res.status(200).json({
                message: "success",
                data: result
            });
        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message
            })
        }
    }

    public static async getObject(req: Request, res: Response, next: NextFunction) {
        try {
            const { bucket = null } = req.params;
            const { fileId = null, createdBy = null } = req.query;
            if (!fileId || !bucket) {
                return res.status(400).json({
                    message: 'fail',
                    data: "fileId or bucket name missing.",
                })
            }
            if (!createdBy) {
                return res.status(400).json({
                    message: 'fail',
                    data: "Invalid user.",
                })
            }
            const result = await AWSService.getObject(bucket as string, Number(fileId), Number(createdBy))

            res.set('Content-Type', result.mimetype);
            res.set('Content-Disposition', `attachment; filename="${result.name}"`);
            const readStream = createReadStream(result.path);
            readStream.on('error', (error) => {
                console.error('Error while reading file:', error);
                res.status(500).send('Error streaming file');
            });

            readStream.on('end', () => {
                console.log('File streamed successfully.');
            });
            readStream.pipe(res);

        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message
            })
        }
    }

    public static async putObject(req: Request, res: Response, next: NextFunction) {
        try {
            const { bucket = null } = req.params;
            const { createdBy } = req.query;
            const uploadedFile = req.file;
            if (!bucket) {
                return res.status(400).json({
                    message: "bucket name missing.",
                })
            }
            if (!createdBy) {
                return res.status(400).json({
                    message: "Invalid User.",
                })
            }
            if (!uploadedFile) {
                return res.status(400).json({
                    message: 'No file uploaded'
                });
            }
            const result = await AWSService.putObject(bucket, uploadedFile, Number(createdBy))

            res.status(200).json({
                message: "success",
                data: result
            });
        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message,
            })
        }
    }

    public static async deleteObject(req: Request, res: Response, next: NextFunction) {
        try {
            const { bucketName = null, fileId = null, createdBy = null } = req.query;
            if (!bucketName || !fileId) {
                return res.status(400).json({
                    message: "bucket name or file id missing.",
                })
            }
            if (!createdBy) {
                return res.status(400).json({
                    message: "invalid user.",
                })
            }
            const result = await AWSService.deleteObject(bucketName as string, Number(fileId), Number(createdBy))

            res.status(200).json({
                message: "success",
                data: result[0]
            });
        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message,
            })
        }
    }

    public static async listObjects(req: Request, res: Response, next: NextFunction) {
        try {
            const { createdBy = null, bucketName = null } = req.query;
            if (!createdBy) {
                return res.status(400).json({
                    message: "invalid user.",
                })
            }
            const result = await AWSService.listObjects(bucketName as string | null, Number(createdBy))
            res.status(200).json({
                message: "success",
                data: result
            });
        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message,
            })
        }
    }

    public static async listBuckets(req: Request, res: Response, next: NextFunction) {
        try {
            const { createdBy = null } = req.query;
            if (!createdBy) {
                return res.status(400).json({
                    message: "invalid user.",
                })
            }
            const result = await AWSService.listBuckets(Number(createdBy))
            res.status(200).json({
                message: "success",
                data: result
            });
        } catch (e: any) {
            return res.status(400).json({
                message: "fail",
                data: e.message,
            })
        }
    }
}