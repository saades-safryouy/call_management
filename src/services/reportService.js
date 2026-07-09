import axiosClient from "../api/client";

const reportService = {
  getDashboard: async () => {
    const { data } = await axiosClient.get("/dashboard/admin");
    return data;
  },
};

export default reportService;