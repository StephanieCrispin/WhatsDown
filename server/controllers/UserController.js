import UserModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json({ status: "Successful", otherDetails });
    } else {
      res.status(404).json({ status: "Failed", message: "No such User" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "24h" }
      );
      console.log({ user, token });
      res.status(200).json({ user, token });
    } catch (error) {
      console.log("Error agya hy");
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// Follow a User
// changed
export const followUser = async (req, res) => {
  // id represents the person to be followed
  // id from params represents the person that will be followed

  const id = req.params.id;
  // _id represents the preson that wants to follow
  // So basically _id belongs to the person that will do the following

  const { _id } = req.body;
  console.log(id, _id);

  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        const updatedFollowUser = await UserModel.findByIdAndUpdate(
          id,
          { $push: { followers: _id } },
          { new: true }
        );
        const updatedFollowingUser = await UserModel.findByIdAndUpdate(
          _id,
          { $push: { following: id } },
          { new: true }
        );
        res.status(200).json({
          status: "success",
          follower: updatedFollowingUser,
          followed: updatedFollowUser,
        });
      } else {
        res.status(403).json({
          status: "failed",
          message: "you are already following this user",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
export const unfollowUser = async (req, res) => {
  const id = req.params.id;

  //id the id of the user to be unfollowed
  const { _id } = req.body;

  // _id the id of the user doing
  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        const updatedUnFollowUser = await UserModel.findByIdAndUpdate(
          id,
          { $pull: { followers: _id } },
          { new: true }
        );
        const updatedUnFollowingUser = await UserModel.findByIdAndUpdate(
          _id,
          { $pull: { following: id } },
          { new: true }
        );
        res.status(200).json({
          status: "success",
          unfollower: updatedUnFollowingUser,
          unfollowed: updatedUnFollowUser,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "You are not following this User",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
