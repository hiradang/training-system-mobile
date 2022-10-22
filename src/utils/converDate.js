import moment from 'moment';

export const convertDate = dateString => {
  if (dateString) {
    let date = new Date(dateString);
    return moment(date).format('DD/MM/YYYY');
  }
  return '';
};
