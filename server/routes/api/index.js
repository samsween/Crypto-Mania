const router = require("express").Router();
const userRouter = require("./userRouter");
const marketRouter = require("./marketRouter");
const cryptoRouter = require("./cryptoRoutes");

router.use("/user", userRouter);
router.use("/market", marketRouter);
router.use("/crypto", cryptoRouter);
module.exports = router;
