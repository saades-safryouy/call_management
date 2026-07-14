import axiosClient from '../api/client';

const candidateService = {
  getDashboard: async () => {
    const { data } = await axiosClient.get('/candidate/dashboard');
    return data;
  },
};

export default candidateService;