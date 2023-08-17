import messageModel from "../Models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { from, to, msg } = req.body;
    const data = await messageModel.create({
      message: {
        text: msg,
      },
      users: [from, to],
      sender: from,
    });
    res.status(200).json("message sent");
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
