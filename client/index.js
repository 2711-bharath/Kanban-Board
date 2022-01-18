import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import usersRouter from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({ extend: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send('Welcome to server');
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.databaseurl, { useUnifiedTopology: true})
.then(() => console.log('Connected to database successfully'))
.catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})
