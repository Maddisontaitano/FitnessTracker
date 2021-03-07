//adding required dependencies 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// adding schema for exercises 
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => Date.now()
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: true
      },
      name: {
        type: String,
        trim: true,
        required: true
      },
      duration: {
        type: Number,
        default: 0,
        allowNull: true
      },
      weight: {
        type: Number,
        default: 0,
        allowNull: true,
      },
      sets: {
        type: Number,
        default: 0,
        allowNull: true
      },
     
    },
  ],
});
const Workouts = mongoose.model("Workouts", workoutSchema);

//exporting module
module.exports = Workouts;