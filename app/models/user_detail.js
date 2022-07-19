module.exports = (sequelize, DataTypes) => {
  var User_detail = sequelize.define('User_detail', {
    full_name: {
      type: DataTypes.STRING
    },
    mobile_no: {
      type: DataTypes.STRING
    }
  });
  User_detail.associate = (models) => {
    User_detail.belongsTo(models.User,{
      foreignKey: {
        allowNull: false,
        name: 'user_id'
      }
    });
  };
  return User_detail;
};
