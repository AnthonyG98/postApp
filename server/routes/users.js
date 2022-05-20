const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users, Messages } = require("../models");

router.post("/", async (req, res) => {
  const { username, password, profile_picture, profile_cover } = req.body;
  const createdUser = bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      profile_picture: profile_picture,
      profile_cover: profile_cover,
    });
  });
  res.json(username);
});
//replace profile pic
router.put("/profile/:pic", async (req, res) => {
  const profilePicture = req.params.pic;
  const image = await Users.findOne({
    where: { profile_picture: profilePicture },
  });

  const { profile_picture } = req.body;

  image.profile_picture = profile_picture;

  await image.save();
  res.json("updated");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "user does not exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username or password" });
      } else {
        res.json(user);
      }
    });
  }
});
router.get("/:user", async (req, res) => {
  const user = req.params.user;
  const searchedUser = Users.findAll({ where: { username: user } });

  res.json(searchedUser);
});

module.exports = router;
