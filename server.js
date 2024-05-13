import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import ServerRouter from './routes/server-route.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.use("/api", ServerRouter);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту.`));
    } catch (e) {
        console.log(e);
    }
}

start();