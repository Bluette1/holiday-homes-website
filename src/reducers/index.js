import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import holidayHomes from './holidayHomes';
import filter from './filter';
import user from './user';
import favourites from './favourites';
import categories from './categories';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  holidayHomes,
  filter,
  user,
  favourites,
  categories,
});
export default createRootReducer;
