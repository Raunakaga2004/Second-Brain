import  express from "express";

import cors from "cors"
import mongoose from "mongoose";

import { DATABASE_URI } from "./config";

import authRouter from './routes/auth'
import contentRouter from './routes/content'
import brainRouter from './routes/brain'
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/content', contentRouter)
app.use('/api/v1/brain', brainRouter)

app.listen(PORT, () => 
    console.log(`Server is running on ${PORT}`)
);

mongoose.connect(DATABASE_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((e)=>{
    console.error(e);
});