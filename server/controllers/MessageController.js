import MessageModel from "../models/messageModel.js";

// TODO: If there's time in the future make the database requests in one move where it doesn't have to be two
export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json({ status: "Success", data: result });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json({ status: "Success", data: result });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};
