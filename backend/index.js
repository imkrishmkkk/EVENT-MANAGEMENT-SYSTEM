import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import eventRoutes from './routes/event.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
configDotenv();

const PORT = process.env.PORT || 8080;
console.log("Server is starting...");

mongoose.connect(process.env.MONGO).then( ()=> {
    console.log("Mongodb Connected");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors({
    origin: "http://localhost:5175",
    credentials: true
  }));
  
app.use(express.json());
app.use(cookieParser());

app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
});
app.use('/backend/event', eventRoutes);
app.use('/backend/user',userRoutes);
app.use('/backend/auth',authRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => { 
    res.sendFile(path.join(__dirname,'client' ,'dist','index.html'));
});


app.use(((err,req,res,next) => {
    const statusCode =err.statusCode || 500;
    const message =err.message || "Internal server error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })

}));
