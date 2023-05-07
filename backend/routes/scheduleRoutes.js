const express = require("express");
const router = express.Router();
const {
  getSchedule,
  setSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

router.route("/").get(getSchedule).post(setSchedule);

router.route("/:id").put(updateSchedule).delete(deleteSchedule);

module.exports = router;
