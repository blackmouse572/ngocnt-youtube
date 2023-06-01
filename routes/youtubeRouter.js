const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Youtubes = require("../models/youtube");
router.use(bodyParser.json());
router.post("/", (req, res) => {
  Youtubes.create(req.body)
    .then((newYoutubes) => {
      res.status(201).json(newYoutubes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get all Youtubes responses
router.get("/", (req, res) => {
  Youtubes.find()
    .then((youtubes) => {
      res.json(youtubes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:youtubesId", getYoutubes, (req, res) => {
  res.json(res.youtubes);
});
router.put("/:youtubesId", getYoutubes, (req, res) => {
  res.youtubes
    .set(req.body)
    .save()
    .then((updatedYoutubes) => {
      res.json(updatedYoutubes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:youtubesId", getYoutubes, (req, res) => {
  res.youtubes
    .remove()
    .then(() => {
      res.json({ message: "Youtubes response deleted" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

function getYoutubes(req, res, next) {
  Youtubes.findById(req.params.responseId)
    .then((youtubes) => {
      if (youtubes == null) {
        return res.status(404).json({ message: "Youtubes response not found" });
      }
      res.youtubes = youtubes;
      next();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
module.exports = router;
