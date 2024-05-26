const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, name, password: hash });
    await newUser.save();

    const token = await newUser.generateToken();

    return res.status(200).json({ status: "ok", newUser, token });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

userController.checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      return res.status(200).json({ status: "ok", user, info: 200 });
    }

    res.status(200).json({ status: "ok", user: null, info: 400 });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "ok", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId, "-createdAt -updatedAt -__v");
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "ok", user });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = userController;
