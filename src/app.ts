import express, { Application, Express } from "express";
import cors, { CorsOptions } from "cors";
import { Routes } from './routes';
import db from "./db/index";
import helmet from "helmet";
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export class App {
    private route: Routes = new Routes();

    constructor(app: Express) {
        this.config(app);
        this.syncDatabase();
        this.route.routes(app);

    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            // origin: "http://localhost:8000"
            origin: "*",
            maxAge: 7200,
        };
        app.use(helmet());
        app.use(cors(corsOptions));
        app.use(express.json({ limit: "200mb", type: 'application/json' }));
        app.use(express.urlencoded({ extended: false, limit: 10000000 }));
        app.use(express.static(path.resolve(`${__dirname}/../../public`)))
    }

    private syncDatabase() {
        db.sequelize
            .authenticate()
            .then(async () => {
                console.log('connection has been established successfully.')
                if (process.env.SYNC == 'true' ? true : false) {
                    await db.sequelize.sync({ force: true })
                    console.log("sync database successfully")
                }
            })
            .catch((err: any) => {
                db.sequelize.close();
                console.log("unable to connect to the database: => ", err.message)

            })

    }
}
