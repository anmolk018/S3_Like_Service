import express from "express";
import { App } from "./src/app";
import 'dotenv/config'


const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const initServer = () => {
    const server = app.listen(PORT, () => {
        console.log("Server running at PORT :", process.env.PORT)
    })

    server.on('error', (err: Error) => {
        console.log('Server Error', err)
    })
}

const init = async () => {
    new App(app);
    initServer();
}

process.on('uncaughtException', function (err) {
    console.log(err)
})
process.on('unhandledRejection', function (err) {
    console.log(err)
})

init();


