module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fb_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientSecret64: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salesforceUserid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salesforceOrgid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salesforceUsertype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salesforceInstanceurl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return User;
};
