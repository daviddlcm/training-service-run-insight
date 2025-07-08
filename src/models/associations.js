const Training = require("./training.model");
const Weather = require("./weather.model");
const TrainingTypes = require("./training_types.model");
const TerrainTypes = require("./terrain_types.model");

//training to training types
Training.belongsTo(TrainingTypes, {
  foreignKey: "id_training_type",
  as: "trainingType",
});
TrainingTypes.hasMany(Training, {
  foreignKey: "id_training_type",
  as: "trainings",
});

//training to terrain types
Training.belongsTo(TerrainTypes, {
  foreignKey: "id_terrain_type",
  as: "terrainType",
});
TerrainTypes.hasMany(Training, {
  foreignKey: "id_terrain_type",
  as: "trainings",
});

//training to weather
Training.belongsTo(Weather, {
  foreignKey: "id_weather",
  as: "weather",
});
Weather.hasMany(Training, {
  foreignKey: "id_weather",
  as: "trainings",
});
