const asyncHandler = require("express-async-handler");

const getSchedule = asyncHandler(async (req, res) => {
  res.json({ message: "Get schedule" });
});

const setSchedule = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set Schedule" });
});

const updateSchedule = asyncHandler(async (req, res) => {
  res.json({ message: `Update schedule ${req.params.id}` });
});

const deleteSchedule = asyncHandler(async (req, res) => {
  res.json({ message: `Delete schedule ${req.params.id}` });
});

module.exports = { getSchedule, setSchedule, updateSchedule, deleteSchedule };
