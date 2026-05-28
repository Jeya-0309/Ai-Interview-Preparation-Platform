const fs = require("fs");

const pdfParse = require("pdf-parse");


const analyzeResume = async (req, res) => {

  try {

    const filePath = req.file.path;

    const pdfBuffer =
      fs.readFileSync(filePath);

    const parsedData =
      await pdfParse(pdfBuffer);

    const resumeText =
      parsedData.text.toLowerCase();


    // REQUIRED SKILLS

    const requiredSkills = [
      "react",
      "node",
      "mongodb",
      "express",
      "redux",
      "javascript",
    ];


    // MATCHED SKILLS

    const matchedSkills =
      requiredSkills.filter((skill) =>
        resumeText.includes(skill)
      );


    // SCORE

    const score = Math.floor(
      (matchedSkills.length /
        requiredSkills.length) * 100
    );


    // SUGGESTIONS

    const missingSkills =
      requiredSkills.filter(
        (skill) =>
          !matchedSkills.includes(skill)
      );


    const suggestions =
      missingSkills.map(
        (skill) =>
          `Add ${skill} related projects or skills`
      );


    res.json({
      score,
      matchedSkills,
      suggestions,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};