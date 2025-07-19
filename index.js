require("dotenv").config()
const express = require("express")

const app = express()
const morgan = require("morgan")

const PORT = process.env.PORT || 3002
const env = process.env.NODE_ENV || 'development'

const trainingRoutes = require("./src/routes/training.routes")
const { verifyInternalToken } = require("./src/middlewares/connection.middleware")

if (env === 'production') {
  // No logs
} else {
  app.use(morgan('dev'));
}
app.use(express.json())

app.use(verifyInternalToken)

app.use("/trainings", trainingRoutes)

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})