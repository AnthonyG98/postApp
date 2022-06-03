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
router.get("/inbox/:id", async (req, res) => {
  const myReceiverId = req.params.id;
  const chat = await Messages.findAll({ where: { sender: myReceiverId } });
  res.json(chat);
});
//Receive my own msg sent
router.get("/more/:id", async (req, res) => {
  const myReceiverId = req.params.id;
  const chat = await Messages.findAll({ where: { UserId: myReceiverId } });
  res.json(chat);
});
router.get("/chat/:id", async (req, res) => {
  const chatId = req.params.id;
  const chat = await Messages.findAll({ where: { chatId: chatId } });
  res.json(chat);
});
module.exports = router;
