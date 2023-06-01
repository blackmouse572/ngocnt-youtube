const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  res.end("Will send all the promotions to you!");
});

router.post("/", (req, res, next) => {
  res.end(
    "Will add the promotion: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

router.put("/", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /promotions");
});

router.delete("/", (req, res, next) => {
  res.end("Deleting all promotions");
});

router.get("/:promotionId", (req, res, next) => {
  res.end(
    "Will send details of the promotion: " + req.params.promotionId + " to you!"
  );
});

router.post("/:promotionId", (req, res, next) => {
  res.statusCode = 403;
  res.end(
    "POST operation not supported on /promotions/" + req.params.promotionId
  );
});

router.put("/:promotionId", (req, res, next) => {
  res.write("Updating the promotion: " + req.params.promotionId + "\n");
  res.end(
    "Will update the promotion: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

router.delete("/:promotionId", (req, res, next) => {
  res.end("Deleting promotion: " + req.params.promotionId);
});

module.exports = router;
