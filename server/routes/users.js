const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users, Posts } = require("../models");


router.post("/", async(req, res)=>{
       const {username, password, profile_picture, profile_cover} = req.body;
       const createdUser = bcrypt.hash(password, 10).then((hash)=>{
              Users.create({
                     username: username,
                     password: hash,
                     profile_picture: profile_picture,
                     profile_cover: profile_cover
              });
       });
       res.json(username);
});
//replace profile pic
router.put("/profile/:pic", async (req, res) => {
       const profilePicture = req.params.pic;
       const image = await Users.findOne({where:{profile_picture: profilePicture}});

       const {profile_picture} = req.body; 

       image.profile_picture = profile_picture;

       await image.save();
       res.json("updated");
});
router.put("/cover/:pic", async (req, res) => {
       const coverPicture = req.params.pic;
       const cover = await Users.findOne({where:{profile_cover: coverPicture}});

       const {profile_cover} = req.body; 

       cover.profile_cover = profile_cover;

       await cover.save();
       res.json("updated");
});

router.get("/:username", async(req, res)=>{
       const username = req.params.username
       const users = await Users.findOne({where: {username: username}});
       res.json(users);
});
router.post("/login", async(req, res)=>{
       const { username, password } = req.body;
       const user = await Users.findOne({ where: { username:username } });
       if(!user) {
              res.json({error: "user does not exist"});
       } else {
              bcrypt.compare(password, user.password).then((match)=>{
                     if(!match) {
                            res.json({error: "Wrong username or password"})     
                     } else {
                            res.json(user)
                     }
              })
       }
});
router.post("/post", async(req, res)=>{
       const {post, post_user, post_profilePic, userId} = req.body;
       Posts.create({
              post: post,
              post_user: post_user,
              post_profilePic: post_profilePic,
              UserId: userId
       });
       res.json("post created");
});
router.get("/", async(req, res)=>{
       const posts = await Posts.findAll();
       res.json(posts);
});
router.get("/posts/:posts", async(req, res)=>{
       const posts = req.params.posts;
       const allPosts = await Posts.findAll({where: {UserId: posts}});

       res.json(allPosts);
});

module.exports = router;