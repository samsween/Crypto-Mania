const router = require("express").Router();
const userController = require("../../controller/userController");

router.post("/register", userController.login);

router.post("/login", userController.register);

module.exports = router;
