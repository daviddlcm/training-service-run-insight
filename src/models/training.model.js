const {DataTypes, Model} = require("sequelize")
const sequelize = require("../configs/sequelize.config")

class Training extends Model {}

Training.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      time_minutes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      distance_km: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      rhythm: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      altitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_weather: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "weathers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_terrain_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "terrain_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_training_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "training_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
},{
    sequelize,
    modelName: "Training",
    tableName: "trainings",
    timestamps: true,
})

module.exports = Training