const sequelize = require("../configs/sequelize.config");
const { Training } = require("../models/index");
const { TrainingTypes } = require("../models/index");
const { TerrainTypes } = require("../models/index");
const { Weather } = require("../models/index");
const { Op } = require("sequelize");
const createTrainingService = async (idUser, training) => {
  try {
    const {
      time_minutes,
      distance_km,
      rhythm,
      date,
      altitude,
      notes,
      trainingType,
      terrainType,
      weather,
    } = training;

    const trainingTypeName = await TrainingTypes.findOne({
      where: { name: trainingType },
    });
    if (!trainingTypeName) {
      throw new Error("Training type not found");
    }
    const terrainTypeName = await TerrainTypes.findOne({
      where: { name: terrainType },
    });
    if (!terrainTypeName) {
      throw new Error("Terrain type not found");
    }
    const weatherName = await Weather.findOne({
      where: { name: weather },
    });
    if (!weatherName) {
      throw new Error("Weather type not found");
    }

    const newTraining = await Training.create({
      id_user: idUser,
      time_minutes,
      distance_km,
      rhythm,
      date,
      altitude,
      notes,
      id_training_type: trainingTypeName.id,
      id_terrain_type: terrainTypeName.id,
      id_weather: weatherName.id,
    });

    //console.log("Training created successfully: ", newTraining);

    return newTraining;
  } catch (error) {
    //console.error("Error creating training service:", error);
    throw error;
  }
};

const getTrainingByIdService = async (id) => {

  try {
    const training = await Training.findByPk(id, {
      include: [
        { model: TrainingTypes, as: "trainingType" },
        { model: TerrainTypes, as: "terrainType" },
        { model: Weather, as: "weather" },
      ],
    });
    //console.log("Training found:", training);

    if (!training) {
      throw new Error("Training not found");
    }

    return {
      id: training.id,
      time_minutes: training.time_minutes,
      distance_km: training.distance_km,
      rhythm: training.rhythm,
      date: training.date,
      altitude: training.altitude,
      notes: training.notes || "",
      trainingType: training.trainingType.name,
      terrainType: training.terrainType.name,
      weather: training.weather.name,
      id_user: training.id_user,
    };
  } catch (error) {
    //console.error("Error getting training by ID:", error);
    throw error;
  }
};

const getAllTrainingsByUserIdService = async (idUser) => {
  try { 

    const userConfirm = await Training.findOne({
      where: { id_user: idUser },
    })
    if (!userConfirm) {
      throw new Error("User not found");
    }

    const trainings = await Training.findAll({
      where: { id_user: idUser },
      include: [
        { model: TrainingTypes, as: "trainingType" },
        { model: TerrainTypes, as: "terrainType" },
        { model: Weather, as: "weather" },
      ],
    });
    //console.log("Trainings found:", trainings);
    if (trainings.length === 0) {
      throw new Error("No trainings found for this user");
    }

    return trainings.map((training) => ({
      id: training.id,
      time_minutes: training.time_minutes,
      distance_km: training.distance_km,
      rhythm: training.rhythm,
      date: training.date,
      altitude: training.altitude,
      notes: training.notes || "",
      trainingType: training.trainingType.name,
      terrainType: training.terrainType.name,
      weather: training.weather.name,
    }));
  } catch (error) {
    //console.error("Error getting all trainings by user ID:", error);
    throw error;
  }
};

const getWeeklyDistanceService = async (idUser, weekMode =1 ) => {
  try {
    // if (!idUser) {
    //   throw new Error("User ID is required");
    // }
    const userConfirm = await Training.findOne({
      where: { id_user: idUser },
    })
    if (!userConfirm) {
      throw new Error("User not found");
    }

    
    const result = await Training.findOne({
      where: {
        id_user: idUser,
        date: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("WEEK", sequelize.col("date"), weekMode),
              sequelize.fn("WEEK", new Date(), weekMode)
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("date")),
              sequelize.fn("YEAR", new Date())
            ),
          ],
        },
      },
      attributes: [
          [sequelize.fn("SUM", sequelize.col("distance_km")), "totalKm"],
          [sequelize.fn("COUNT", sequelize.col("id")), "totalTrainings"],
          [sequelize.fn("AVG", sequelize.col("rhythm")), "avgRhythm"],
        ],
    });
    //console.log(result)
    if (!result) {
      return {
        totalKm: 0,
        totalTrainings: 0,
        avgRhythm: 0,
      }
    }
    return {
        totalKm: parseFloat(result.getDataValue("totalKm") || 0),
        totalTrainings: parseInt(result.getDataValue("totalTrainings") || 0),
        avgRhythm: parseFloat(result.getDataValue("avgRhythm") || 0),
    }
  } catch (error) {
    //console.error("Error getting weekly distance:", error);
    throw error;
  }
};

module.exports = {
  createTrainingService,
  getTrainingByIdService,
  getAllTrainingsByUserIdService,
  getWeeklyDistanceService,
};
