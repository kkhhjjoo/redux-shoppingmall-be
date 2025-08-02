const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();
// Netlify 배포 주소로만 CORS 허용 (예시: https://shoppingmall-demo.netlify.app)
app.use(
  cors({
    origin: [
      'https://shoppingmall-demo-4cef448e629c.netlify.app', // 실제 Netlify 배포 주소
      'http://localhost:3000', // 개발용
    ],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //req.body가 객체로 인식이 됩니다

app.use('/api', indexRouter);
//  /api/user

// 루트 경로 응답 추가
app.get('/', (req, res) => {
  res.send('Hello, this is the shopping-mall backend!');
});

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, { useNewUrlParser: true }) //
  .then(() => console.log('mongoose connected')) //
  .catch((err) => console.log('DB connection fail', err));

app.listen(process.env.PORT || 5000, () => {
  console.log('server on');
});
