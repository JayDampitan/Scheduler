const express = require("express");
const router = express.Router();
const {
    getUserInfo,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", protect, getUserInfo);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
