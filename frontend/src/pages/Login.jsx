import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user || isSuccess) {
          toast.success(
      "Login Successful 🚀"
      );
        setTimeout(() => {

      navigate("/");

    }, 1000);

    
    }
  }, [user, isSuccess, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] flex">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-1/2 flex-col justify-between p-14 bg-gradient-to-b from-[#f5f7ff] to-[#eef1ff]">

        <div>

          <div className="flex items-center gap-3 mb-16">

            <div className="bg-[#5b5ff6] text-white p-3 rounded-2xl text-2xl">
              🤖
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#111827]">
                AI Interview Platform
              </h1>

              <p className="text-[#5b5ff6] font-medium">
                Practice. Improve. Succeed.
              </p>
            </div>

          </div>


          <h2 className="text-6xl font-bold leading-tight text-[#111827]">

            Ace Your Next
            <br />
            Interview with
            <br />

            <span className="text-[#5b5ff6]">
              AI Power
            </span>

          </h2>


          <p className="mt-8 text-xl text-gray-600 max-w-xl leading-10">

            Get AI-generated questions, real-time
            feedback, and personalized insights
            to crack your dream job.

          </p>


          <div className="mt-14 space-y-8">

            <div className="flex items-start gap-5">

              <div className="bg-white p-4 rounded-2xl shadow">
                🎯
              </div>

              <div>

                <h3 className="font-bold text-2xl">
                  AI Mock Interviews
                </h3>

                <p className="text-gray-600 mt-1 text-lg">
                  Realistic questions tailored to your role
                </p>

              </div>

            </div>


            <div className="flex items-start gap-5">

              <div className="bg-white p-4 rounded-2xl shadow">
                📊
              </div>

              <div>

                <h3 className="font-bold text-2xl">
                  Smart Feedback
                </h3>

                <p className="text-gray-600 mt-1 text-lg">
                  Instant analysis and actionable suggestions
                </p>

              </div>

            </div>


            <div className="flex items-start gap-5">

              <div className="bg-white p-4 rounded-2xl shadow">
                🏆
              </div>

              <div>

                <h3 className="font-bold text-2xl">
                  Track Your Progress
                </h3>

                <p className="text-gray-600 mt-1 text-lg">
                  Monitor performance and improve continuously
                </p>

              </div>

            </div>

          </div>

        </div>


        <div className="text-gray-400 text-sm">
          © 2026 AI Interview Platform
        </div>

      </div>


      {/* RIGHT SECTION */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <h1 className="text-5xl font-bold text-center text-[#111827]">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-500 mt-4 text-lg">
            Login to continue your interview journey
          </p>


          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-[#5b5ff6]"
              />

            </div>


            <div>

              <label className="font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-[#5b5ff6]"
              />

            </div>


            <button
              type="submit"
              className="w-full bg-[#5b5ff6] hover:bg-[#4b4fe0] text-white py-4 rounded-2xl font-bold text-lg transition cursor-pointer hover:scale-105 transition"
            >
              Login
            </button>

          </form>


          <p className="text-center mt-8 text-gray-600">

            Don’t have an account?

            <Link
              to="/signup"
              className="text-[#5b5ff6] font-semibold ml-1"
            >
              Sign up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;