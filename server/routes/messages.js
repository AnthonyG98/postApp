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
    sender,
    UserId,
  } = req.body;
  const createdUser = Messages.create({
    message: message,
    chatId: chatId,
    sender_profile_picture: sender_profile_picture,
    receiver_profile_picture: receiver_profile_picture,
    sender: sender,
    UserId: UserId,
  });
  res.json(sender);
});
//for left side inbox find messages received
router.get("/:id", async (req, res) => {
  const myReceiverId = req.params.id;
  const chat = await Messages.findAll({ where: { receiversId: myReceiverId } });
  res.json(chat);
});
module.exports = router;
