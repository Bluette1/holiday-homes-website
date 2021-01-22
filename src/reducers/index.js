import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import holidayHomes from './holidayHomes';
import filter from './filter';
import user from './user';
import favorites from './favourites';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  holidayHomes,
  filter,
  user,
  favorites,
});
export default createRootReducer;
