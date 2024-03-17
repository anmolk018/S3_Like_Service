import * as express from 'express';
import { AwsController } from '../controllers/aws.controller';
const router = express.Router();
import multer from 'multer';
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post('/create/bucket', AwsController.createBucket);
router.get('/get-object/:bucket', AwsController.getObject);
router.post('/put-object/:bucket', upload.single('file'), AwsController.putObject);
router.post('/delete-object', AwsController.deleteObject);
router.get('/list/objects', AwsController.listObjects);
router.get('/list/buckets', AwsController.listBuckets);

export default router;