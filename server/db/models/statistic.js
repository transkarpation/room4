const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Statistic.belongsTo(models.Traking);
    }
  }
  Statistic.init(
    {
      account_id: DataTypes.STRING,
      personaname: DataTypes.STRING,
      solo_competitive_rank: DataTypes.STRING,
      estimate: DataTypes.STRING,
      rank_tier: DataTypes.STRING,
      competitive_rank: DataTypes.STRING,
      leaderboard_rank: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Statistic',
    }
  );
  return Statistic;
};