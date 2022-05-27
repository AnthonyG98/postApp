const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Messages } = require("../models");

router.post("/", async (req, res) => {
  const {
    message,
    chatId,
    sender_profile_picture,
    receiver_profile_picture,
    sent,
  } = req.body;
  const createdUser = Messages.create({
    message: message,
    chatId: chatId,
    sender_profile_picture: sender_profile_picture,
    receiver_profile_picture: receiver_profile_picture,
    sent: true,
  });
  res.json(username);
});
module.exports = router;
