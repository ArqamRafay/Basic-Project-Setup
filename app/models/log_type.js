module.exports = (sequelize, DataTypes) => {
  var Log_type = sequelize.define('Log_type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Log_type;
};
