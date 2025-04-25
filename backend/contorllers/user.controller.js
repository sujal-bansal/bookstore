import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe contorller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { bio, currentPassword, newPassword, avatar } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (bio) {
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ message: "Provide current and the new password" });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Password" });
      }
      if (currentPassword === newPassword) {
        return res
          .status(400)
          .json({ error: "New Password cannot be same as current password" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be atleast 6 characters long" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    user.bio = bio || user.bio;

    user = await user.save();
    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateProfile controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
