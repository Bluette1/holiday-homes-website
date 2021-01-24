import _ from 'lodash';
import {
  REMOVE_FROM_FAVOURITES, ADD_TO_FAVOURITES, REGISTER_FAVOURITES,
} from '../actions/actionTypes';

const initialState = [];

const findAndDeleteFavorite = (favorites, id) => favorites.filter(favorite => favorite.id !== id);

export default function favourites(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FAVOURITES: {
      return [
        ..._.cloneDeep(state), ...action.holidayHomes,
      ];
    }
    case ADD_TO_FAVOURITES: {
      return [
        ..._.cloneDeep(state), action.favourite,
      ];
    }
    case REMOVE_FROM_FAVOURITES: {
      return findAndDeleteFavorite([..._.cloneDeep(state)], action.id);
    }

    default:
      return state;
  }
}
