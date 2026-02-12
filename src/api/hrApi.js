import axiosClient from "./axiosClient";

const hrApi = {
  // Upload Excel file for preview
  uploadBulkInvite: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post("/hr/invite/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Confirm invite for valid users
  confirmBulkInvite: (users) => {
    return axiosClient.post("/hr/invite/confirm", { users });
  },
};

export default hrApi;
