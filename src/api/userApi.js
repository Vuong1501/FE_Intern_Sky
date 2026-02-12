import axiosClient from "./axiosClient";

const userApi = {
  getMe: () => {
    return axiosClient.get('/users/me');
  },
};

export default userApi;
