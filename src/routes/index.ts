import { Request, Response, Application } from 'express';
import aws from './aws.route';
import auth from './auth.route';
export class Routes {

    public routes(app: Application) {
        app.use('/api/aws', aws);
        app.use('/api/auth', auth);
    }
}