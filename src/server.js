const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./utils/connectDB");
const authRouter = require('./routes/auth.router');
const app = express();

const corsOption = {
    origin: process.env.origin,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(express.json({ limit: '70mb' }));
  app.use(express.urlencoded({ limit: '70mb', extended: true}));
  app.use(cors(corsOption));
  if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
  }

app.use('/api/auth', authRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server Listening On Port ${port} successfully! `);
    connectDB();
})