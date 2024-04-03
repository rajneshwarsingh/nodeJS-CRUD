import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
const __dirname = path.dirname('');

/* Environment */
import 'dotenv/config';
import config from './config/default.js';
const env = config[process.env.NODE_ENV || 'staging'];

import productRouter from './routes/products.js';
import userRouter from './routes/users.js';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.use('/v1/product', productRouter);
app.use('/v1/user', userRouter);

/* Mongo connection */
mongoose.connect(env.dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('MongoDB connected successfully.');
});

/* Server Listening on 3000 port */
app.listen(env.port, () => {
  console.log(`Server listening ${env.port}`);
});
