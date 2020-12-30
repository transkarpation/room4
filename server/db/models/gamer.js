const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gamer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gamer.belongsTo(models.User);
    }
  }
  Gamer.init(
    {
      account_id: DataTypes.STRING,
      competitive_rank: DataTypes.STRING,
      leaderboard_rank: DataTypes.STRING,
      mmr_estimate: DataTypes.STRING,
      avatarmedium:  DataTypes.STRING,
      cheese:  DataTypes.STRING,
      is_contributor:  DataTypes.STRING,
      last_login:  DataTypes.STRING,
      personaname:  DataTypes.STRING,
      rank_tier:  DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Gamer',
    }
  );
  return Gamer;
};
