import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';
import itemRouter from './routes/itemRoute.js';
import userRouter from './routes/userRoute.js';
import packageRouter from './routes/packageRoute.js';


const app = express();
const port = process.env.PORT || 4000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);


//DATABASE
connectDB()

//MIDDLEWARE
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5174/', 'http://localhost:5175/']
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(_dirname, 'uploads')))
app.use('/api/items', itemRouter)
app.use('/api/package', packageRouter)


app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(port, () => {
    console.log('Server Started on http://localhost:4000');
})