const router = require("express").Router();
const userRouter = require("./userRouter");
const marketRouter = require("./marketRouter");

router.use("/user", userRouter);
router.use("/market", marketRouter);

module.exports = router;
