const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");

router.post("/user-signup", registerUser);
// router.post('/farmarlogin', loginFarmar)

module.exports = router;
