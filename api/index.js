import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import authRoute from './routes/auth.js';

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

app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
