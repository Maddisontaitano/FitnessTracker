const db = require("../models");
const router = require("express").Router();

// Add field for total duration of exercise using aggregate
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// Add exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
      console.error(err);
    });
});

// Create workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
      console.error(err);
    });
});

// GET workouts in range to show stats
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
  // Add sort function for past seven days
    .sort({ "day": -1 })
    .limit(7)
    .then((dbWorkout) => {
      dbWorkout.reverse();
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
      console.error(err);
    });
});

module.exports = router;