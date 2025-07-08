const { DataTypes, Model } = require("sequelize");

const sequelize = require("../configs/sequelize.config");

class TrainingTypes extends Model {}

TrainingTypes.init(
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
    modelName: "TrainingType",
    tableName: "training_types",
    timestamps: false,
  }
);

module.exports = TrainingTypes;
