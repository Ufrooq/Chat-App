import messageModel from "../Models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    console.log(from, to, message);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    console.log("getMessages");
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};