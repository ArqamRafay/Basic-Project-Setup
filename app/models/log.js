module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define('Log', {
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Log.associate = (models) => {
    Log.belongsTo(models.Log_type,{
      foreignKey: {
        allowNull: false,
        name: 'log_type_id'
      }
    });
    Log.belongsTo(models.User,{
      foreignKey: {
        allowNull: false,
        name: 'user_id'
      }
    });
  };
  return Log;
};
