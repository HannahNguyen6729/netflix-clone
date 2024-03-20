import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

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

//routers
app.use('/', () => {
  console.log('OK');
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
