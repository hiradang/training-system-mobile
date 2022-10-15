import olAxios from './index';

export const subjectApi = {
  getSubjects: () => olAxios.get('/api/subjects'),
};
