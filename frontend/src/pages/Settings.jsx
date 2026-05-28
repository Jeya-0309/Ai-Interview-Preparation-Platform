import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout }
from "../features/auth/authSlice";


function Settings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#f5f7ff] p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-3">
          Manage your account settings
        </p>


        <div className="mt-10 space-y-6">

          <div className="border p-6 rounded-3xl">

            <h2 className="text-2xl font-bold">
              Account
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account preferences
            </p>

          </div>


          <button
           onClick={() => {

  dispatch(logout());

  navigate("/login");
}}
            className="bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;