const UserInfo = require("../models/UserInfo");

exports.createUserInfo = async (req, res) => {
  try {
    const { firstName, lastName, email, consent } = req.body;
    const userInfo = new UserInfo({ firstName, lastName, email, consent });
    await userInfo.save();
    res.status(201).json({ message: "User information saved successfully", userInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user information", details: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.find();
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user information", details: error.message });
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUserInfo = await UserInfo.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: "User information updated successfully", updatedUserInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user information", details: error.message });
  }
};

exports.deleteUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await UserInfo.findByIdAndDelete(id);
    res.status(200).json({ message: "User information deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user information", details: error.message });
  }
};
