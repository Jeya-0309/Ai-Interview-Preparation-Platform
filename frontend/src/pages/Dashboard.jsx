import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getInterviews,
} from "../features/interview/interviewSlice";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";


function Dashboard() {

  const dispatch = useDispatch();

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  const {
    interviews,
    isLoading,
  } = useSelector(
    (state) => state.interview
  );

  const { user } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {

    dispatch(getInterviews());

  }, [dispatch]);


  // LOADING

  if (isLoading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white px-10 py-6 rounded-3xl shadow-xl text-2xl font-bold">

          ⏳ Loading Dashboard...

        </div>

      </div>
    );
  }


  // TOTAL INTERVIEWS

  const totalInterviews =
    interviews.length;


  // AVERAGE SCORE

  const averageScore =
    interviews.length > 0
      ? Math.floor(
          interviews.reduce(
            (acc, item) =>
              acc + item.score,
            0
          ) / interviews.length
        )
      : 0;


  // TOPIC ANALYTICS

  const topicScores = {};

  interviews.forEach((item) => {

    if (!topicScores[item.topic]) {

      topicScores[item.topic] = {
        total: 0,
        count: 0,
      };
    }

    topicScores[item.topic].total += item.score;

    topicScores[item.topic].count += 1;
  });


  // STRONGEST SKILL

  let strongestSkill = "N/A";

  let highestAvg = 0;

  Object.keys(topicScores).forEach((topic) => {

    const avg =
      topicScores[topic].total /
      topicScores[topic].count;

    if (avg > highestAvg) {

      highestAvg = avg;

      strongestSkill = topic;
    }
  });


  // WEAK AREA

  let weakArea = "N/A";

  let lowestAvg = Infinity;

  Object.keys(topicScores).forEach((topic) => {

    const avg =
      topicScores[topic].total /
      topicScores[topic].count;

    if (avg < lowestAvg) {

      lowestAvg = avg;

      weakArea = topic;
    }
  });


  // STREAK

  const streak = interviews.length;


  return (
    <div className="min-h-screen bg-[#f5f7ff] flex">

      {/* MOBILE TOPBAR */}

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-[#5b5ff6]">
          AI Interview
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="text-3xl cursor-pointer"
        >
          <FiMenu />
        </button>

      </div>


      {/* SIDEBAR */}

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-72 bg-white shadow-lg flex flex-col justify-between p-8 z-50 transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }

        lg:flex`}
      >

        <div>

          {/* CLOSE BUTTON */}

          <div className="flex justify-end lg:hidden mb-4">

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="text-3xl cursor-pointer"
            >
              <FiX />
            </button>

          </div>


          {/* LOGO */}

          <div className="flex items-center gap-3 mb-14">

            <div className="bg-[#5b5ff6] text-white p-3 rounded-2xl text-2xl">
              🤖
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                AI Interview
              </h1>

              <p className="text-[#5b5ff6] text-sm">
                Prep Platform
              </p>

            </div>

          </div>


          {/* MENU */}

          <div className="space-y-4">

            <Link
              to="/"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`block p-4 rounded-2xl font-medium transition ${
                location.pathname === "/"
                  ? "bg-[#5b5ff6] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              📊 Dashboard
            </Link>


            <Link
              to="/interview"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`block p-4 rounded-2xl font-medium transition ${
                location.pathname ===
                "/interview"
                  ? "bg-[#5b5ff6] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              🎯 Mock Interview
            </Link>


            <Link
              to="/history"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`block p-4 rounded-2xl font-medium transition ${
                location.pathname ===
                "/history"
                  ? "bg-[#5b5ff6] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              📜 Interview History
            </Link>


            <Link
              to="/resume-analyzer"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`block p-4 rounded-2xl font-medium transition ${
                location.pathname ===
                "/resume-analyzer"
                  ? "bg-[#5b5ff6] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              📄 Resume Analyzer
            </Link>


            <Link
              to="/settings"
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`block p-4 rounded-2xl font-medium transition ${
                location.pathname ===
                "/settings"
                  ? "bg-[#5b5ff6] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              ⚙️ Settings
            </Link>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          onClick={() =>
            dispatch(logout())
          }
          className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold cursor-pointer"
        >
          Logout
        </button>

      </div>


      {/* OVERLAY */}

      {
        sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />

        )
      }


      {/* MAIN CONTENT */}

      <div className="flex-1 p-6 lg:p-10 pt-28 lg:pt-10">

        {/* TOP */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Ready for your next interview practice?
            </p>

          </div>


          <div className="flex flex-wrap gap-4">

            <div className="bg-white px-6 py-4 rounded-2xl shadow text-lg font-semibold">

              🔥 {streak} Interview Streak

            </div>


            <Link
              to="/interview"
              className="bg-[#5b5ff6] hover:bg-[#4b4fe0] text-white px-6 py-4 rounded-2xl font-semibold transition cursor-pointer"
            >
              Start Interview
            </Link>

          </div>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div className="bg-white p-6 rounded-3xl shadow">

            <p className="text-gray-500 text-lg">
              Interviews Taken
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {totalInterviews}
            </h2>

          </div>


          <div className="bg-white p-6 rounded-3xl shadow">

            <p className="text-gray-500 text-lg">
              Average Score
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {averageScore}%
            </h2>

          </div>


          <div className="bg-white p-6 rounded-3xl shadow">

            <p className="text-gray-500 text-lg">
              Strongest Skill
            </p>

            <h2 className="text-3xl font-bold mt-4 break-words">
              {strongestSkill}
            </h2>

          </div>


          <div className="bg-white p-6 rounded-3xl shadow">

            <p className="text-gray-500 text-lg">
              Weak Area
            </p>

            <h2 className="text-3xl font-bold mt-4 break-words">
              {weakArea}
            </h2>

          </div>

        </div>


        {/* RECENT INTERVIEWS */}

        <div className="bg-white mt-10 p-8 rounded-3xl shadow">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Recent Interviews
            </h2>

            <Link
              to="/history"
              className="text-[#5b5ff6] font-semibold"
            >
              View All
            </Link>

          </div>


          <div className="mt-8 space-y-5">

            {interviews.length > 0 ? (

              interviews.map((item) => (

                <div
                  key={item._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-4"
                >

                  <div>

                    <h3 className="font-bold text-xl">
                      {item.topic}
                    </h3>

                    <p className="text-gray-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  <div className="text-[#5b5ff6] font-bold text-2xl">

                    {item.score}%

                  </div>

                </div>

              ))

            ) : (

              <div className="text-center py-10">

                <h2 className="text-2xl font-bold">
                  No Interviews Yet
                </h2>

                <p className="text-gray-500 mt-3">
                  Start your first mock interview
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;