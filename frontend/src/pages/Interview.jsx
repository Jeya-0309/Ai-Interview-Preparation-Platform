import { useState } from "react";

import API from "../api/axios";
import toast from "react-hot-toast";

function Interview() {
  const [topic, setTopic] = useState("");

  const [questions, setQuestions] = useState([]);

  const [interviewId, setInterviewId] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [answerText, setAnswerText] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // GENERATE QUESTIONS

  const generateInterview = async () => {
    try {
      setLoading(true);

      const response = await API.post(
        "/interviews",
        { topic },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setQuestions(response.data.questions);

      setInterviewId(response.data._id);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // NEXT QUESTION

  const handleNext = () => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = {
      question: questions[currentQuestion],
      answer: answerText,
    };

    setAnswers(updatedAnswers);

    setAnswerText("");

    setCurrentQuestion(currentQuestion + 1);
  };

  // PREVIOUS QUESTION

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion(currentQuestion - 1);

    setAnswerText(answers[currentQuestion - 1]?.answer || "");
  };

  // SUBMIT INTERVIEW

  const submitInterview = async () => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = {
      question: questions[currentQuestion],
      answer: answerText,
    };

    try {
      const response = await API.put(
        "/interviews/submit",
        {
          interviewId,
          answers: updatedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setResult(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      console.log(error);
    }
  };

  // RESULT SCREEN

  if (result) {
    return (
      <div className="min-h-screen bg-[#f5f7ff] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center">
          <h1 className="text-5xl font-bold">Interview Completed 🎉</h1>

          <h2 className="text-3xl mt-8 font-bold text-[#5b5ff6]">
            Score: {result.score}%
          </h2>

          <p className="mt-6 text-xl text-gray-600">{result.feedback}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7ff] px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold">AI Mock Interview</h1>

        <p className="text-gray-500 mt-3">
          Practice technical interviews with AI
        </p>

        {/* GENERATE SECTION */}

        {questions.length === 0 && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter topic like React"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 border border-gray-300 p-4 rounded-2xl"
            />

            <button
              onClick={generateInterview}
              className="bg-[#5b5ff6] text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  ⏳ Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        )}

        {/* QUESTION SECTION */}

        {questions.length > 0 && (
          <div className="mt-10">
            <div className="bg-gray-100 p-6 rounded-3xl">
              <h2 className="text-2xl font-bold">
                Question {currentQuestion + 1}
              </h2>

              <p className="mt-4 text-xl">{questions[currentQuestion]}</p>
            </div>

            {/* ANSWER */}

            <textarea
              placeholder="Type your answer..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="w-full mt-8 border border-gray-300 rounded-3xl p-5 min-h-[200px] focus:outline-none focus:border-[#5b5ff6]"
            />

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="bg-gray-200 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
              >
                Previous
              </button>

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-[#5b5ff6] text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={submitInterview}
                  className="bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                >
                  Submit Interview
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;
