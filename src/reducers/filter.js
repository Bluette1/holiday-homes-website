import { CHANGE_FILTER } from '../actions/actionTypes';

const initialState = 'All';

const filter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER: {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};

export default filter;
