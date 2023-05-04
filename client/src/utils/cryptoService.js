import axios from "axios";

const cryptoService = {
  getCryptoMarket: async () => {
    try {
      const res = await axios.get("/api/market", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  getUserCrypto: async () => {
    try {
      const res = await axios.get("/api/crypto", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  buyCrypto: async (crypto) => {
    try {
      const res = await axios.post("/api/crypto", crypto, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  sellCrypto: async (crypto) => {
    try {
      const res = await axios.post("/api/crypto/sell", crypto, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
};

export default cryptoService;
