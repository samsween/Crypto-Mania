const router = require("express").Router();
const cryptoController = require("../../controller/cryptoController");
const requireUser = require("../../middleware/requireUser");

router.post("/", requireUser, cryptoController.addCrypto);
router.get("/", requireUser, cryptoController.getCrypto);
router.post('/sell', requireUser, cryptoController.sellCrypto);
router.get('/transactions', requireUser, cryptoController.getTransactions)
module.exports = router;
