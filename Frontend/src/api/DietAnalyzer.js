import axiosClient from "./axiosClient";

const DietAnalyzer = {
  analyzeDiet: (data) => {
    return axiosClient.post("/diet/analyze", data);
  },

  customChat: (prompt) => {
    return axiosClient.post("/diet/custom", { prompt });
  },

  getStats: () => {
    return axiosClient.get("/diet/stats");
  },

  getDietHistory: () => {
    return axiosClient.get("/diet/diet-history");
  },

  getAnalysisHistory: () => {
    return axiosClient.get("/diet/history-analysis");
  }
};

export default DietAnalyzer;
