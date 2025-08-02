const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();
app.use(cors());
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
