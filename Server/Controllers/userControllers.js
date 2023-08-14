import userModel from "../Models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const createToken = (id) => {
  return jwt.sign({ id }, process.env.EXCESS_TOKEN, {
    expiresIn: 60 * 60 * 24 * 3,
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne({ username });
    if (isUserExist) {
      res.status(409).json({ message: "username already used" });
    }
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedpassword,
    });
    delete newUser.password;
    const jwt_token = createToken(newUser._id);
    res
      .cookie("token", jwt_token, {
        httpOnly: true,
        secure: true,
        maxAge: new Date(Date.now() + 3 * 1000 * 24 * 60 * 60),
      })
      .status(200)
      .json({ userId: newUser._id });
  } catch (error) {
    res.status(200).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const jwt_token = createToken(user._id);
        res
          .cookie("token", jwt_token, {
            httpOnly: true,
            secure: true,
            maxAge: new Date(Date.now() + 3 * 1000 * 24 * 60 * 60),
          })
          .status(200)
          .json({ user: user._id });
      } else {
        throw Error("Incorrect password!");
      }
    } else {
      throw Error("Incorrect username!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
