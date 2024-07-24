import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// TODO: In the future maybe make the posts picture an array so if a person is uploading multiple posts it can show in a carousel
// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json({ status: "Success", data: newPost });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json({ status: "Success", data: post });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ status: "Success", message: updatedPost });
    } else {
      res
        .status(403)
        .json({ status: "Failed", message: "Authentication failed" });
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ status: "Success", message: "Post disliked" });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ status: "Success", message: "Post liked" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
// export const getTimelinePosts = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const currentUserPosts = await PostModel.find({ userId: userId });

//     const followingPosts = await UserModel.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);
//     const allPosts = currentUserPosts
//       .concat(...followingPosts[0].followingPosts)
//       .sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       });
//     res.status(200).json({ status: "Success", data: allPosts });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    // Fetch current user posts and sort by createdAt
    const currentUserPosts = await PostModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    // Fetch following users' posts
    const followingPostsResult = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $unwind: "$followingPosts",
      },
      {
        $sort: { "followingPosts.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          followingPosts: { $push: "$followingPosts" },
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    const followingPosts = followingPostsResult[0]?.followingPosts || [];

    // Merge and sort all posts by createdAt
    const allPosts = [...currentUserPosts, ...followingPosts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({ status: "Success", data: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};
