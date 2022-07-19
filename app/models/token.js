module.exports = (sequelize, DataTypes) => {
const Token = sequelize.define('Token', {
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  refreshTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});
Token.associate = (models) => {
  Token.belongsTo(models.User,{
    foreignKey: {
      allowNull: false,
      name: 'user_id'
    }
  });
};
return Token;
};
