import axios from 'axios';

const olAxios = axios.create({
  baseURL: 'https://training-system.aqaurius6666.space',
  timeout: 1000000,
});

export default {
  get: olAxios.get,
  post: olAxios.post,
  put: olAxios.put,
  delete: olAxios.delete,
  patch: olAxios.patch,
};
