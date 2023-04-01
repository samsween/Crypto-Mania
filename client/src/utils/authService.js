import axios from "axios";
const baseUrl = "http://localhost:3000";
const authService = {
  register: async (user) => {
    try {
      const res = await axios.post(baseUrl + "/api/user/register", user, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.msg;
    }
  },
  login: async (user) => {
    try {
      const res = await axios.post(baseUrl + "/api/user/login", user, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.msg;
    }
  },
  logout: async () => {
    try {
      const res = await axios.delete(baseUrl + "/api/user/logout", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.msg;
    }
  },

  auth: async () => {
    try {
      const res = await axios.get(baseUrl + "/api/user/auth", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.msg;
    }
  },
};

export default authService;