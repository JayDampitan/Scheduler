const express = require("express")
const { errorHandler } = require("./middleware/errorMiddleware")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const scheduleRoute = require("./routes/scheduleRoutes")


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/schedule", scheduleRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))