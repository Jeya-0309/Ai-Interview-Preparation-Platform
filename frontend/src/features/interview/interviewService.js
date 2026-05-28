import API from "../../api/axios";


const getInterviews = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const response = await API.get(
    "/interviews",
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return response.data;
};

const interviewService = {
  getInterviews,
};

export default interviewService;