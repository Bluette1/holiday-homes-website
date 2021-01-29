import _ from 'lodash';

import {
  REMOVE_HOLIDAY_HOME, CREATE_HOLIDAY_HOME, REGISTER_HOLIDAY_HOMES,
  UPDATE_HOLIDAY_HOME, HIDE_FROM_LIST,
} from '../actions/actionTypes';

import {
  findAndDeleteHolidayHome, findAndUpdateHolidayHome, setProperty,
} from '../selectors/index';

const initialState = [];

export default function holidayHomes(state = initialState, action) {
  switch (action.type) {
    case REGISTER_HOLIDAY_HOMES: {
      return [
        ...action.holidayHomes,
      ];
    }
    case CREATE_HOLIDAY_HOME: {
      return [
        action.holidayHome, ..._.cloneDeep(state),
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
