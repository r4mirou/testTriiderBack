import moment from 'moment';

const dateNowBR = moment.utc().tz('America/Sao_Paulo').format();
const dateNowUTC = moment.utc().format();

const formatSaveData = (date) => moment.utc(date).format();
const formatReadData = (date) => moment.utc(date).tz('America/Sao_Paulo').format();

const nameDayWeek = (index) => {
  const days = ['sunday', 'monday', 'tuesday',
    'wednesday', 'thursday', 'friday', 'saturday'];
  return days[index];
};
const nameTurnDay = (index) => {
  const turns = ['morning', 'afternoon', 'night'];
  return turns[index];
};

export {
  nameTurnDay,
  nameDayWeek,
  dateNowBR,
  dateNowUTC,
  formatSaveData,
  formatReadData,
};
