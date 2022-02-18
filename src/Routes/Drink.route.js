const express = require("express");
const authorization = require("../Middleware/Auth.middleware");
const Drink = require("../controllers/Drink.controller");
const router = express.Router();
router.post(
  "/addGoods",
  authorization.authorization,
  authorization.isAdmin,
  Drink.addGoods
);
router.get("/fetchGoods", Drink.fetchGoods);
router.patch(
  "/updateGoods",
  authorization.authorization,
  authorization.isAdmin,
  Drink.updateGoods
);
router.delete(
  "/removeGoods",
  authorization.authorization,
  authorization.isAdmin,
  Drink.deleteGoods
);
module.exports = router;
