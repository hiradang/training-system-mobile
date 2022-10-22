import olAxios from './index';

export const subjectApi = {
  getSubjects: params =>
    olAxios.get(`/api/subjects/?q%5Bname%5D=${params.name}`),
};
export const examApi = {
  getListExams: (subjecId, userId) =>
    olAxios.get(`/api/subjects/${subjecId}/users/${userId}/exams`),
  createExam: (subjecId, userId) =>
    olAxios.post(`/api/subjects/${subjecId}/users/${userId}/exams`),
};
export const questionApi = {
  getQuestions: examId => olAxios.get(`/api/exams/${examId}`),
};
export const profileApi = {
  getInfoProfile: id => olAxios.get(`/api/users/${id}/edit`),
  patchInfoProfile: (id, data) => olAxios.patch(`/api/users/${id}/`, data),
  patchInfoProfilePass: (id, email, name, password, cr_password) =>
    olAxios.patch(`/api/users/${id}/`, {email, name, password, cr_password}),
};
export const AuthApi = {
  signup: (name, email, password) =>
    olAxios.post('/en/api/users', {name, email, password}),
  login: (email, password) => olAxios.post('/api/sessions', {email, password}),
};
