import _ from 'lodash';
import {
  REMOVE_FROM_FAVOURITES, ADD_TO_FAVOURITES, REGISTER_FAVOURITES,
} from '../actions/actionTypes';

const initialState = [];

const findAndDeleteFavorite = (favorites, id) => favorites.filter(favorite => favorite.id !== id);

export default function books(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FAVOURITES: {
      return [
        ..._.cloneDeep(state), ...action.holidayHome,
      ];
    }
    case ADD_TO_FAVOURITES: {
      return [
        ..._.cloneDeep(state), action.holidayHome,
      ];
    }
    case REMOVE_FROM_FAVOURITES: {
      const { id } = action.holidayHome;
      return findAndDeleteFavorite([..._.cloneDeep(state)], id);
    }

    default:
      return state;
  }
}
