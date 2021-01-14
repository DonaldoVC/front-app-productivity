import {LOADING} from '../constants';

const initialState = {
  loading: false,
  error: null
};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {loading: action.loading};
    default:
      return state;
  }
}
