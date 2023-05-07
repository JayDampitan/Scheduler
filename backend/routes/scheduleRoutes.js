const express = require("express");
const router = express.Router();
const {
  getSchedule,
  setSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSchedule).post(protect, setSchedule);

router
  .route("/:id")
  .put(protect, updateSchedule)
  .delete(protect, deleteSchedule);

module.exports = router;
