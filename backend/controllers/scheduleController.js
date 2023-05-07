const asyncHandler = require("express-async-handler");
const Schedule = require("../models/scheduleModel");

// Get all schedule controller
const getSchedule = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find();

  res.json(schedules);
});

// Create schedule controller
const setSchedule = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const schedule = await Schedule.create({
    text: req.body.text,
  });

  res.status(200).json(schedule);
});

// Update schedule controller
const updateSchedule = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const schedule = await Schedule.findById(id);

  if (!schedule) {
    res.status(400);
    throw new Error("Schedule not found");
  }

  const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedSchedule);
});

// Delete schedule controller
const deleteSchedule = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const schedule = await Schedule.findByIdAndRemove(id);

  if (!schedule) {
    res.status(400);
    throw new Error("Schedule not found");
  }

  res.status(200).json({ id: id });
});

module.exports = { getSchedule, setSchedule, updateSchedule, deleteSchedule };
