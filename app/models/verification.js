module.exports = (sequelize, DataTypes) => {
  var verification = sequelize.define('verification', {
    sms_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sms_expire_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_sms_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sms_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email_expire_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_dont_show: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }

  });
  verification.associate = (models) => {
    verification.belongsTo(models.User,{
      foreignKey: {
        allowNull: false,
        name: 'user_id'
      }
    });
  };
  return verification;
};
