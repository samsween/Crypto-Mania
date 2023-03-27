const router = require("express").Router();
const userRouter = require("./api/userRouter");
const marketRouter = require("./api/marketRouter");

router.use("/user", userRouter);
router.use("/market", marketRouter);

module.exports = router;
