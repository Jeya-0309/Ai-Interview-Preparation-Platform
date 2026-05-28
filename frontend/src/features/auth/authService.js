import API from "../../api/axios";


// REGISTER
const register = async (userData) => {

  const response = await API.post(
    "/auth/register",
    userData
  );

  if (response.data) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );
  }

  return response.data;
};


// LOGIN
const login = async (userData) => {

  const response = await API.post(
    "/auth/login",
    userData
  );

  if (response.data) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );
  }

  return response.data;
};


// LOGOUT
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;