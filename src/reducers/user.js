import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = JSON.parse(localStorage.getItem('user'));

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return action.user;
    }

    case LOGOUT: {
      localStorage.removeItem('user');
      return null;
    }

    default: {
      return state;
    }
  }
};

export default user;
