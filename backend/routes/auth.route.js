const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    getLoggedInUser,
} = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/user", protect, getLoggedInUser);

module.exports = router;
