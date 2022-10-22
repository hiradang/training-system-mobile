import olAxios from './index';

export const subjectApi = {
  getSubjects: params => olAxios.get('/api/subjects/', params),
};
export const profileApi = {
  getInfoProfile: (id) => olAxios.get(`/api/users/${id}/edit`),
  patchInfoProfile: (id, data) => olAxios.patch(`/api/users/${id}/`, data),
  patchInfoProfilePass: (id, email, name, password, cr_password) => olAxios.patch(`/api/users/${id}/`, {email, name, password, cr_password}),
};
export const AuthApi = {
  signup: (name, email, password) => olAxios.post('/en/api/users', { name, email, password }),
  login: (email, password) => olAxios.post('/api/sessions', { email, password }),
};
