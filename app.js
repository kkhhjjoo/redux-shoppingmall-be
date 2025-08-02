const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();

// CORS 미들웨어를 가장 먼저 설정
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://shoppingmall-app-demo.netlify.app',
      'https://shoppingmall-demo-4cef448e629c.herokuapp.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', indexRouter);

// 루트 경로 응답
app.get('/', (req, res) => {
  res.send('Hello, this is the shopping-mall backend!');
});

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.log('DB connection fail', err));

app.listen(process.env.PORT || 5000, () => {
  console.log('server on port', process.env.PORT || 5000);
});