const router = require("express").Router();
const userController = require("../../controller/userController");
const requireUser = require("../../middleware/requireUser");
router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/auth", requireUser, userController.auth);

module.exports = router;
