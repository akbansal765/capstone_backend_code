import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { userRoutes, videosRoutes, commentRoutes, channelRoutes } from './routes/routes.js';

//creating instance of express
const app = express();

//creating local server
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Local server is running at http://localhost:${PORT}/`);
});

//application level middlewares
app.use(express.json());
app.use(cors());

//calling routes with app
userRoutes(app);
videosRoutes(app);
commentRoutes(app);
channelRoutes(app);


//connecting with MongoDB Atlas
mongoose.connect('mongodb+srv://akbansal765:9ZLkSADVpWFOxPNf@cluster0.wxkk1bi.mongodb.net/capstoneProject').then(() => {
    console.log("MongoDB Atlas Successfully Connected!!");
}).catch(() => {
    console.log("MongoDB Atlas not connected. Try again!!");
})
