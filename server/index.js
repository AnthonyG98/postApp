const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//routes
const users = require("./routes/users");
app.use("/users", users);

db.sequelize.sync().then(()=>{
       app.listen(process.env.PORT || 3001, ()=>{
              console.log("server started")
       })
}).catch(err =>{
       console.log(err)
});
