const Interview = require("../models/interview.model");

const generateQuestions = require(
  "../services/openai.service"
);


// CREATE INTERVIEW
const createInterview = async (req, res) => {

  try {

    const { topic } = req.body;

    const aiQuestions = await generateQuestions(topic);

    const questionsArray = Array.isArray(aiQuestions)
  ? aiQuestions
  : aiQuestions
      .split("\n")
      .filter((q) => q.trim() !== "");


    const interview = await Interview.create({
      userId: req.user,
      topic,
      questions: questionsArray,
    });

    res.status(201).json(interview);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET INTERVIEWS
const getInterviews = async (req, res) => {

  try {

    const interviews = await Interview.find({
      userId: req.user,
    });

    res.json(interviews);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

const submitInterview = async (req, res) => {

  try {

    const { interviewId, answers } = req.body;

    // SIMPLE SCORE LOGIC

    let totalScore = 0;

  answers.forEach((item) => {

  const answer =
    item.answer.trim().toLowerCase();

  const words = answer.split(" ");

  // RANDOM TEXT CHECK
  const hasMeaningfulWords =
    /[aeiou]/.test(answer);

  // SCORE LOGIC
  if (
    words.length >= 15 &&
    hasMeaningfulWords
  ) {

    totalScore += 20;

  } else if (
    words.length >= 8
  ) {

    totalScore += 12;

  } else if (
    words.length >= 3
  ) {

    totalScore += 5;

  } else {

    totalScore += 0;
  }

});

    // FEEDBACK

    let feedback = "";

    if (totalScore >= 80) {
      feedback =
        "Excellent performance. Strong answers.";
    } else if (totalScore >= 50) {
      feedback =
        "Good attempt. Improve answer depth.";
    } else {
      feedback =
        "Need more practice and detailed answers.";
    }


    const updatedInterview =
      await Interview.findByIdAndUpdate(
        interviewId,
        {
          answers,
          score: totalScore,
          feedback,
        },
        { new: true }
      );

    res.json(updatedInterview);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
    getInterviews,
    submitInterview,

};