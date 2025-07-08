const { DataTypes, Model } = require("sequelize");

const sequelize = require("../configs/sequelize.config");

class Weather extends Model {}

Weather.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Weather",
    tableName: "weathers",
    timestamps: false,
  }
);

module.exports = Weather;
