import express from 'express';
import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check for existing user
    const userInDB = await User.findOne({ email });

    if (!userInDB) {
      const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_KEY
        ).toString(),
      });

      await newUser.save();
      return res.status(201).json(newUser);
    }
    return res.status(422).send({
      message: 'email already registered',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'could not register user',
      error: err,
    });
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    !user && res.status(401).json('Incorrect email!');

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json('Incorrect password!');

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    const { password, ...info } = user;
    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: 'could not login',
      error: err,
    });
  }
});

export default router;
