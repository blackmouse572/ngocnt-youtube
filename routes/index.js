var express = require("express");
var leaderRouter = require("./leaderRouter");
var promoRouter = require("./promoRouter");
var dishRouter = require("./dishRouter");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/leadership", leaderRouter);
router.use("/promotions", promoRouter);
router.use("/dishes", dishRouter);
router.use("/youtube", require("./youtubeRouter"));

module.exports = router;
