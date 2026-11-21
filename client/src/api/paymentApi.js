import axiosClient from './axiosClient';

export const paymentApi = {
  getPlans: () => axiosClient.get('/payments/plans'),
  getStatus: () => axiosClient.get('/payments/status'),
};
