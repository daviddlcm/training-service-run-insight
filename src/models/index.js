const Training = require("./training.model")
const Weather = require("./weather.model")
const TrainingTypes = require("./training_types.model")
const TerrainTypes = require("./terrain_types.model")

require("./associations")

module.exports = {
  Training,
  Weather,
  TrainingTypes,
  TerrainTypes,
}