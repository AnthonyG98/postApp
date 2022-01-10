module.exports = (sequelize, DataTypes) =>{
       const Posts = sequelize.define("Posts", {
              post:{
                     type: DataTypes.STRING,
                     allowNull: false
              },
              post_user: {
                     type: DataTypes.STRING,
                     allowNull: false
              },
              post_profilePic: {
                     type: DataTypes.STRING,
                     allowNull: true
              }
       });
       return Posts
}