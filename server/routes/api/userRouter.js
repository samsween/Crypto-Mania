const router = require("express").Router();
const User = require("../../models/User");
const { login, register } = require("../../controller/userController");

router.post("/register", login);

router.post("/login", register);

module.exports = router;
