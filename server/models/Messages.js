module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sender_profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiver_profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Messages;
};
