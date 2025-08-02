const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('유저가 이미 존재합니다');
    }
    const salt = bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : 'customer',
    });
    await newUser.save();
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          status: 'fail',
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          status: 'fail',
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
    }
    // 로그인 성공 시 토큰 발급 등 추가 가능
    return res
      .status(200)
      .json({
        status: 'success',
        user: { email: user.email, name: user.name, level: user.level },
      });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

module.exports = userController;
