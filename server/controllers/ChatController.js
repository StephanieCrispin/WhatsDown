import ChatModel from "../models/chatModel.js";

const findOrCreateChat = async (senderId, receiverId) => {
  try {
    const chat = await ChatModel.findOne({
      $or: [
        { members: [senderId, receiverId] },
        { members: [receiverId, senderId] },
      ],
    });

    if (chat) {
      return chat;
    } else {
      const newChat = new ChatModel({
        members: [senderId, receiverId],
      });
      await newChat.save();
      return newChat;
    }
  } catch (error) {
    console.error("Error finding or creating chat:", error);
    throw error;
  }
};

// Example usage with Express
// app.post("/createOrGetChat", async (req, res) => {
//   const { senderId, receiverId } = req.body;

//   try {
//     const chat = await findOrCreateChat(senderId, receiverId);
//     res.status(200).json(chat);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const result = await findOrCreateChat(senderId, receiverId);

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
