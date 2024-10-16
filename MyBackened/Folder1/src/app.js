import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true
}))

app.use(express.json({limit:process.env.LIMITS}));
app.use(express.urlencoded({extended:true,limit:process.env.LIMITS}));
app.use(cookieParser())

export default app;