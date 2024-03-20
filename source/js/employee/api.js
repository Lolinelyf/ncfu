import axios from 'axios';

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://webadm.ncfu.ru/api/sotr/`,
    timeout: 5000,
    //withCredentials: true,
  });
  const onSuccess = (response) => response;
  const onError = (error) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
