import userModel from "../Models/userModels.js";
import bcrypt from "bcrypt";

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
    console.log(newUser);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(200).json(error);
  }
};
