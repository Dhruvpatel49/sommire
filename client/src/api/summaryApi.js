import axiosClient from './axiosClient';

export const summaryApi = {
  uploadAndGenerate: (formData, onUploadProgress) =>
    axiosClient.post('/summaries/upload-and-generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    }),

  getAll: () => axiosClient.get('/summaries'),

  getById: (id) => axiosClient.get(`/summaries/${id}`),

  delete: (id) => axiosClient.delete(`/summaries/${id}`),

  store: (data) => axiosClient.post('/summaries/store', data),
};
