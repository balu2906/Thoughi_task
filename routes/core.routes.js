const router = require("express").Router();

const coreController = require("../controllers/core.controller");

router.post("/orders", coreController.postOrders);

router.get("/orders/:orderID", coreController.OrderByID);

router.get("/orders", coreController.allOrders);

module.exports = router;
