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
  getHistoricalMarket: async (id, time) => {
    try {
      const res = await axios.get(
        `/api/market/historical?id=${id}&days=${time}`
      );
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
  getTransactions: async () => {
    try {
      const res = await axios.get("/api/crypto/transactions", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
};

export default cryptoService;
