const express = require("express")
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const scheduleRoute = require("./routes/scheduleRoutes")

const connectDB = require("./config/db")


const app = express()

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/schedule", scheduleRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))