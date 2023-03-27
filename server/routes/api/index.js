const router = require("express").Router();
const userRouter = require("./api/userRouter");

router.use("/user", userRouter);

module.exports = router;
