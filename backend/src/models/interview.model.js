const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    topic: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
      {
        question: String,
        answer: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);