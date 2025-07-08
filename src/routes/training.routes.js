const express = require("express")

const router = express.Router()

const trainingController = require("../controllers/training.controller")

router.get("/weekly-distance/:id", trainingController.getWeeklyDistance)
router.get("/user/:id", trainingController.getAllTrainingsByUserId)
router.post("/", trainingController.createTraining)
router.get("/:id", trainingController.getTrainingById)

module.exports = router