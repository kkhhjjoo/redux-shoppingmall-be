const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();

// CORS 설정 수정 - 더 포괄적으로 설정
app.use(
  cors({
    origin: [
      'https://shoppingmall-app-demo.netlify.app', // Netlify 실제 배포 주소
      'http://localhost:3000', // 개발용
      'http://127.0.0.1:3000', // 로컬 개발용 (대안 주소)
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  })
);

// preflight 요청 처리
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', indexRouter);

// 루트 경로 응답 추가
app.get('/', (req, res) => {
  res.send('Hello, this is the shopping-mall backend!');
});

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.log('DB connection fail', err));

app.listen(process.env.PORT || 5000, () => {
  console.log('server on');
});