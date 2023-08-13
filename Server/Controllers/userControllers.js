import userModel from "../Models/userModels";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne({ username });
    if (isUserExist) {
      res.json({ message: "username already used" });
    }
    res.status(200).json("dta posted ");
  } catch (error) {
    res.status(200).json(error);
  }
};
