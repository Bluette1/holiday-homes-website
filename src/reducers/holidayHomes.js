import _ from 'lodash';
import {
  REMOVE_HOLIDAY_HOME, CREATE_HOLIDAY_HOME, REGISTER_HOLIDAY_HOMES,
  UPDATE_HOLIDAY_HOME, HIDE_FROM_LIST,
} from '../actions/actionTypes';

const initialState = [];

const findAndDeleteHolidayHome = (holidayHomes, id) => holidayHomes.filter(
  holidayHome => holidayHome.id !== id,
);

const findAndUpdateHolidayHome = (holidayHomes, holidayHome) => {
  const index = holidayHomes.findIndex(hme => holidayHome.id === hme.id);
  return [...holidayHomes.slice(0, index), holidayHome, ...holidayHomes.slice(index + 1)];
};

const setProperty = (holidayHomes, id, key) => {
  const index = holidayHomes.findIndex(holidayHome => holidayHome.id === id);
  const holidayHome = holidayHomes[index];
  holidayHome[key] = key;
  return [...holidayHomes.slice(0, index), holidayHome, ...holidayHomes.slice(index + 1)];
};

export default function holidayHomes(state = initialState, action) {
  switch (action.type) {
    case REGISTER_HOLIDAY_HOMES: {
      return [
        ..._.cloneDeep(state), ...action.holidayHomes,
      ];
    }
    case CREATE_HOLIDAY_HOME: {
      return [
        ..._.cloneDeep(state), action.holidayHome,
      ];
    }
    case REMOVE_HOLIDAY_HOME: {
      const { id } = action.holidayHome;
      return findAndDeleteHolidayHome([..._.cloneDeep(state)], id);
    }

    case HIDE_FROM_LIST: {
      const { id } = action;
      const holidayHomes = [..._.cloneDeep(state)];
      return setProperty(holidayHomes, id, 'hide');
    }
    case UPDATE_HOLIDAY_HOME: {
      const { holidayHome } = action;
      return findAndUpdateHolidayHome([..._.cloneDeep(state)], holidayHome);
    }
    default:
      return state;
  }
}
