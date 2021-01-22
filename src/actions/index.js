import {
  REMOVE_HOLIDAY_HOME,
  CREATE_HOLIDAY_HOME,
  UPDATE_HOLIDAY_HOME,
  CHANGE_FILTER, REGISTER_FAVOURITES, REGISTER_HOLIDAY_HOMES,
  LOGIN, LOGOUT, REMOVE_FROM_FAVOURITES, ADD_TO_FAVOURITES, HIDE_FROM_LIST,
} from './actionTypes';

export const createholidayHome = holidayHome => ({
  type: CREATE_HOLIDAY_HOME,
  holidayHome,
});

export const addToFavorites = holidayHome => ({
  type: ADD_TO_FAVOURITES,
  holidayHome,
});

export const removeHolidayHome = holidayHome => ({
  type: REMOVE_HOLIDAY_HOME,
  holidayHome,
});

export const hideFromList = holidayHome => ({
  type: HIDE_FROM_LIST,
  holidayHome,
});
export const updateHolidayHome = holidayHome => ({
  type: UPDATE_HOLIDAY_HOME,
  holidayHome,
});

export const removeFromFavourite = holidayHome => ({
  type: REMOVE_FROM_FAVOURITES,
  holidayHome,
});

export const registerFavourites = holidayHomes => ({
  type: REGISTER_FAVOURITES,
  holidayHomes,
});

export const registerHolidayHomes = holidayHomes => ({
  type: REGISTER_HOLIDAY_HOMES,
  holidayHomes,
});

export const login = user => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
  user: {},
});

export const changeFilter = filter => ({ type: CHANGE_FILTER, filter });
