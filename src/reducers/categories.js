import { REGISTER_CATEGORIES } from '../actions/actionTypes';

const initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_CATEGORIES: {
      return [...state, ...action.categories];
    }
    default: {
      return state;
    }
  }
};

export default categories;
