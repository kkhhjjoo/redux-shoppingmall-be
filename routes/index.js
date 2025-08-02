const express = require('express');
const router = express.Router();
const userApi = require('./user.api');

router.use('/user', userApi);
router.get('/', (req, res) => {
  res.send('API root is working!');
});

module.exports = router;
