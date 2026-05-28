const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// FALLBACK QUESTION BANK
const questionBank = {

  "Node.js": [
    "Explain the event loop in Node.js.",
    "What is middleware in Express.js?",
    "Difference between synchronous and asynchronous programming?",
    "How does JWT authentication work?",
    "What are streams in Node.js?",
  ],

  "React": [
    "What are React Hooks?",
    "Difference between useState and useEffect?",
    "What is Redux Toolkit?",
    "Explain virtual DOM.",
    "What are protected routes in React?",
  ],

  "MongoDB": [
    "What is MongoDB?",
    "Difference between SQL and NoSQL?",
    "Explain indexing in MongoDB.",
    "What is aggregation pipeline?",
    "How does Mongoose work?",
  ],

  "JavaScript": [
    "Explain closures in JavaScript.",
    "What is hoisting?",
    "Difference between var let and const?",
    "What are promises?",
    "Explain async await.",
  ],

  "MERN Stack": [
    "Explain MERN architecture.",
    "How does frontend communicate with backend?",
    "Explain JWT authentication flow.",
    "How does Redux work?",
    "What are REST APIs?",
  ],
};


const generateQuestions = async (topic) => {

  try {

    const prompt = `
    Generate 5 interview questions for ${topic}.
    Return only questions.
    `;

    const response =
      await openai.chat.completions.create({

        model: "gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const aiQuestions =
      response.choices[0].message.content;

    return aiQuestions
      .split("\n")
      .filter((q) => q.trim() !== "");


  } catch (error) {

    console.log(
      "OpenAI Failed → Using Fallback Questions"
    );

    return (
      questionBank[topic] || [
        `Explain basics of ${topic}.`,
        `What are important concepts in ${topic}?`,
        `How is ${topic} used in real projects?`,
        `Explain advantages of ${topic}.`,
        `What are common interview questions in ${topic}?`,
      ]
    );
  }
};

module.exports = generateQuestions;