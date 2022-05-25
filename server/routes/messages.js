const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Messages } = require("../models");

router.post("/", async (req, res) => {
  const { username, password, profile_picture, profile_cover } = req.body;
  const createdUser = bcrypt.hash(password, 10).then((hash) => {
    Messages.create({
      username: username,
      password: hash,
      profile_picture: profile_picture,
      profile_cover: profile_cover,
    });
  });
  res.json(username);
});
module.exports = router;
