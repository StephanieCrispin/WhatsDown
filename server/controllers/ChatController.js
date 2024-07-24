import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json({ status: "Success", data: result });
  } catch (error) {
    res.status(500).json({ status: "Failed", data: error });
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ status: "Success", data: chat });
  } catch (error) {
    res.status(500).json({ status: "Failed", data: error });
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      // Find chat takes both ID's of both user's chatting
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json({ status: "Success", data: chat });
  } catch (error) {
    res.status(500).json({ status: "Success", data: error });
  }
};
