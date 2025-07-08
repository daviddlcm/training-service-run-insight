const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/sequelize.config");

class TerrainTypes extends Model {}

TerrainTypes.init(
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
    modelName: "TerrainType",
    tableName: "terrain_types",
    timestamps: false,
  }
);

module.exports = TerrainTypes;
