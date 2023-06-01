const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Dishes = require("../models/dishes");
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  Dishes.find({})
    .then((dishes) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dishes);
    })
    .catch((e) => next(e));
});

router.post("/", (req, res, next) => {
  Dishes.create({
    ...req.body,
  })
    .then((dish) => {
      console.log("Dish created >>>", { dish });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dish);
    })
    .catch((e) => next(e));
});

router.put("/", (req, res, next) => {
  Dishes.findByIdAndUpdate(
    req.body._id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  ).then((dish) => {
    console.log("Dish updated >>>", { dish });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(dish);
  });
});

router.delete("/", (req, res, next) => {
  delete {}
    .then((dishes) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dishes);
    })
    .catch((e) => next(e));
});

router.get("youtubesId", (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dish);
    })
    .catch((e) => next(e));
});

router.post("youtubesId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishs/" + req.params.dishId);
});

router.put("youtubesId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "Will update the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

router.delete("youtubesId", (req, res, next) => {
  const id = req.params.dishId;
  Dishes.findById(id).then((dish) => {
    if (dish == null) {
      const err = new Error("Dish " + id + " not found");
      err.statusCode = 400;
      return next(err);
    }

    for (let i = dish.comments.length - 1; i >= 0; i--) {
      dish.comments.id(dish.comments[i]._id).remove();
    }
  });
});

router.get("/:dishId/comments", (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      if (dish == null) {
        const err = new Error("Dish " + req.params.dishId + " not found");
        err.statusCode = 400;
        return next(err);
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dish.comments);
    })
    .catch((e) => next(e));
});

router.post("/:dishId/comments", (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      if (dish == null) {
        const err = new Error("Dish " + req.params.dishId + " not found");
        err.statusCode = 400;
        return next(err);
      }
      dish.comments.push(req.body);
      dish.save().then((dish) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.json(dish);
      });
    })
    .catch((e) => next(e));
});

router.put("/:dishId/comments", (req, res, next) => {
  res.statusCode = 403;
  res.end(
    "PUT operation not supported on /dishes/" + req.params.dishId + "/comments"
  );
});

router.delete("/:dishId/comments", (req, res, next) => {
  const id = req.params.dishId;
  Dishes.findById(id).then((dish) => {
    if (dish == null) {
      const err = new Error("Dish " + id + " not found");
      err.statusCode = 400;
      return next(err);
    }

    for (let i = dish.comments.length - 1; i >= 0; i--) {
      dish.comments.id(dish.comments[i]._id).remove();
    }

    dish.save().then((dish) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(dish);
    });
  });
});

router.get("/:dishId/comments/:commentId", (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      if (dish == null) {
        const err = new Error("Dish " + id + " not found");
        err.statusCode = 400;
        return next(err);
      }

      res.statusCode = 200;

      const comment = dish.comments.id(req.params.commentId);
      if (comment == null) {
        const err = new Error("Comment " + req.params.commentId + " not found");
        err.statusCode = 400;
        return next(err);
      }

      res.setHeader("Content-Type", "application/json");
      res.json(comment);
    })
    .catch((e) => next(e));
});

module.exports = router;
