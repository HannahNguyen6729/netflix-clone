import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import movieRoute from './routes/movies.js';
import listRoute from './routes/lists.js';

config();
const app = express();

//connect to the database
async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('connect to database successfully'))
    .catch((err) => console.error(err));
}
connectDB();

const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
