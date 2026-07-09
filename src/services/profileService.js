import axiosClient from '../api/client';

const profileService = {

  getProfile: async () => {
    const { data } = await axiosClient.get('/users/me');
    return data;
  },

  changePassword: async (passwords) => {
    const { data } = await axiosClient.put(
      '/users/change-password',
      passwords
    );

    return data;
  }

};

export default profileService;