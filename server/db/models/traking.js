const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Traking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Traking.belongsToMany(models.User, { through: 'User_Trakings' });
    }
  }
  Traking.init(
    {
      account_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Traking',
    }
  );
  return Traking;
};
