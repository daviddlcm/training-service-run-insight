const {
  createTrainingService,
  getTrainingByIdService,
  getAllTrainingsByUserIdService,
  getWeeklyDistanceService,
} = require("../services/training.services");

const createTraining = async (req, res) => {
  try {
    const idUser = req.headers["user-id"];
    const training = req.body;

    console.log("Creating training for user ID:", idUser);
    //console.log("Training data:", training);

    if (!idUser) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    const newTraining = await createTrainingService(idUser, training);
    //const newTraining = { message:"fail"}
    return res.status(201).json({
      message: "Training created successfully",
      newTraining,
      success: true,
    });
  } catch (error) {
    console.error("Error creating training:", error);
    return res
      .status(500)
      .json({ message: "Error creating training", success: false });
  }
};

const getTrainingById = async (req, res) => {
  try {
    const idTraining = req.params.id;

    if (!idTraining) {
      return res
        .status(400)
        .json({ message: "Training ID is required", success: false });
    }

    const training = await getTrainingByIdService(idTraining);

    return res.status(200).json({
      message: "Training retrieved successfully",
      training,
      success: true,
    });
  } catch (error) {
    console.error("Error getting training by ID:", error);
    return res
      .status(500)
      .json({ message: "Error getting training by ID", success: false });
  }
};

const getAllTrainingsByUserId = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }
    const trainings = await getAllTrainingsByUserIdService(idUser);
    return res.status(200).json({
      message: "All trainings retrieved successfully",
      trainings,
      success: true,
    });
  } catch (error) {
    console.error("Error getting all trainings by user ID:", error);
    return res.status(500).json({
      message: "Error getting all trainings by user ID",
      success: false,
    });
  }
};

const getWeeklyDistance = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    const { totalKm, totalTrainings, avgRhythm } =
      await getWeeklyDistanceService(idUser);

    return res.status(200).json({
      message: "Weekly distance retrieved successfully",
      totalKm,
      totalTrainings,
      avgRhythm,
      success: true,
    });
  } catch (error) {
    console.error("Error getting weekly distance:", error);
    return res
      .status(500)
      .json({ message: "Error getting weekly distance", success: false });
  }
};

module.exports = {
  createTraining,
  getTrainingById,
  getAllTrainingsByUserId,
  getWeeklyDistance,
};
