import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return action.user;
    }

    case LOGOUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default user;
