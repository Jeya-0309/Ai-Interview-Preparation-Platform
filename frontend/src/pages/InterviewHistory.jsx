import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getInterviews } from "../features/interview/interviewSlice";

function InterviewHistory() {
  const dispatch = useDispatch();

  const { interviews, isLoading } = useSelector((state) => state.interview);

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  if (isLoading) {
    return <h1 className="p-10 text-3xl">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7ff] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-5xl font-bold">Interview History</h1>

        <p className="text-gray-500 mt-3">Track your interview performance</p>

        <div className="mt-10 space-y-6">
          {interviews.length > 0 ? (
            interviews.map((item) => (
              <div key={item._id} className="border rounded-3xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">{item.topic}</h2>

                    <p className="text-gray-500 mt-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-[#5b5ff6] text-white px-6 py-4 rounded-2xl font-bold text-2xl">
                    {item.score}%
                  </div>
                </div>

                <div className="mt-6 bg-gray-100 p-5 rounded-2xl">
                  <h3 className="font-bold text-xl">Feedback</h3>

                  <p className="mt-3 text-gray-600">{item.feedback}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-5">🎯</div>

              <h2 className="text-3xl font-bold">No Interviews Yet</h2>

              <p className="text-gray-500 mt-3">
                Start your first AI interview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewHistory;
