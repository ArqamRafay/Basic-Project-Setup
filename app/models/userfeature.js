module.exports = (sequelize, DataTypes) => {
  var userFeature = sequelize.define('userFeature', {
    FeatureJson: {
      type: DataTypes.JSON,
      allowNull: false
    },
    totalsms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalemail: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    smsUsed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emailUsed: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });
  userFeature.associate = (models) => {
    userFeature.belongsTo(models.User,{
      foreignKey: {
        allowNull: false,
        name: 'UserID'
      }
    });

  };
  return userFeature;
};
