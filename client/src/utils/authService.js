import axios from "axios";
const authService = {
  register: async (user) => {
    try {
      const res = await axios.post("/api/user/register", user, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  login: async (user) => {
    try {
      const res = await axios.post("/api/user/login", user, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  logout: async () => {
    try {
      const res = await axios.delete("/api/user/logout", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },

  auth: async () => {
    try {
      const res = await axios.get("/api/user/auth", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  info: async () => {
    try {
      const res = await axios.get("/api/user/info", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  update: async (user) => {
    try {
      const res = await axios.put("/api/user/update", user, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
};

export default authService;
