//adding required files and dependencies 
const db = require("../models");
const router = require("express").Router();

// using aggregate to add a field for duration of exercise 
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

// Add an exercise
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

// post route for Creating workout
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

// GET route for workouts to show stats
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
  // Add sort function for the week
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

//exporting module 
module.exports = router;