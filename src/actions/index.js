import {
  REMOVE_HOLIDAY_HOME,
  CREATE_HOLIDAY_HOME,
  UPDATE_HOLIDAY_HOME,
  CHANGE_FILTER, REGISTER_FAVOURITES, REGISTER_HOLIDAY_HOMES,
  LOGIN, LOGOUT, REMOVE_FROM_FAVOURITES, ADD_TO_FAVOURITES,
  HIDE_FROM_LIST, REGISTER_CATEGORIES,
} from './actionTypes';

export const createHolidayHome = holidayHome => ({
  type: CREATE_HOLIDAY_HOME,
  holidayHome,
});

export const addToFavorites = favourite => ({
  type: ADD_TO_FAVOURITES,
  favourite,
});

export const removeHolidayHome = holidayHome => ({
  type: REMOVE_HOLIDAY_HOME,
  holidayHome,
});

export const hideFromList = id => ({
  type: HIDE_FROM_LIST,
  id,
});
export const updateHolidayHome = holidayHome => ({
  type: UPDATE_HOLIDAY_HOME,
  holidayHome,
});

export const removeFromFavourites = id => ({
  type: REMOVE_FROM_FAVOURITES,
  id,
});

export const registerFavourites = holidayHomes => ({
  type: REGISTER_FAVOURITES,
  holidayHomes,
});

export const registerHolidayHomes = holidayHomes => ({
  type: REGISTER_HOLIDAY_HOMES,
  holidayHomes,
});

export const registerCategories = categories => ({
  type: REGISTER_CATEGORIES,
  categories,
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
