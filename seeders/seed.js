// adding required dependencies and files
let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// making seeds for data base 
let workoutSeed = [
  {
    day: new Date().setDate(new Date().getDate()-10),
    exercises: [
      {
        type: "cardio",
        name: "mile run",
        weight: 100,
        duration: 20,
        reps: 1,
        sets: 1
      }
    ]
  },
  {
    day: new Date().setDate(new Date().getDate()-9),
    exercises: [
      {
        type: "resistance",
        name: "benchpress",
        weight: 100,
        duration: 20,
        reps: 10,
        sets: 5
      }
    ]
  },
  {
    day: new Date().setDate(new Date().getDate()-8),
    exercises: [
      {
        type: "stretch",
        name: "toe touch",
        duration: 5,
        weight: 185,
        reps: 8,
        sets: 5
      }
    ]
  },
  {
    day: new Date().setDate(new Date().getDate()-7),
    exercises: [
      {
        type: "cardio",
        name: "swimming",
        duration: 25,
        distance: 1 
      }
    ]
  },
  {
    day: new Date().setDate(new Date().getDate()-6),
    exercises: [
      {
        type: "endurance",
        name: "crunches",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 20
      }
    ]
  },
];

