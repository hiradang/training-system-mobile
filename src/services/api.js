import olAxios from './index';

export const subjectApi = {
  getSubjects: () => olAxios.get('/api/subjects'),
};
export const profileApi = {
  getInfoProfile: (id) => olAxios.get(`/api/users/${id}/edit`),
};
export const AuthApi = {
  signup: (name,email, password) => olAxios.post('/en/api/users', {name, email, password}),
  login: (email, password) => olAxios.post('/api/sessions', { email, password}),
};
