import { useState } from "react";

import API from "../api/axios";
import toast from "react-hot-toast";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();

      formData.append("resume", file);

      const response = await API.post("/resume/analyze", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setResult(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-5xl font-bold">Resume Analyzer</h1>

        <p className="text-gray-500 mt-3 text-lg">
          Upload your resume and get AI insights
        </p>

              {/* UPLOAD */}
              

        <div className="mt-10 border-2 border-dashed border-[#5b5ff6] rounded-3xl p-10 text-center">
          <label className="cursor-pointer flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">📄</div>

            <p className="text-2xl font-semibold">Click to Upload Resume</p>

            <p className="text-gray-500 mt-2">PDF files only</p>

            {file && (
              <div className="mt-4 bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold">
                {file.name}
              </div>
            )}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <br />

          <button
            onClick={analyzeResume}
            className="bg-[#5b5ff6] text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer"
          >
            {loading ? "📄 Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>

        {/* RESULT */}

        {result && (
          <div className="mt-10">
            {/* SCORE */}

            <div className="bg-[#5b5ff6] text-white rounded-3xl p-8">
              <h2 className="text-3xl font-bold">Resume Score</h2>

              <p className="text-7xl font-bold mt-6">{result.score}%</p>
            </div>

            {/* MATCHED SKILLS */}

            <div className="bg-white border mt-8 rounded-3xl p-8">
              <h2 className="text-3xl font-bold">Matched Skills</h2>

              <div className="flex flex-wrap gap-4 mt-6">
                {result.matchedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTIONS */}

            <div className="bg-white border mt-8 rounded-3xl p-8">
              <h2 className="text-3xl font-bold">Suggestions</h2>

              <div className="mt-6 space-y-4">
                {result.suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
