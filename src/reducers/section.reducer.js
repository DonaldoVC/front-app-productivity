import {
  SAVE_SECTION,
  SAVE_SECTION_ERROR,
  GET_SECTIONS,
  GET_SECTIONS_ERROR
} from '../constants';

const initialState = {
  all_sections: [],
  error: null
};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SECTION:
      const all_sections = state.all_sections;
      all_sections.push(action.section);

      return { ...state, lastStatus: action.status, all_sections, error: null};
    case SAVE_SECTION_ERROR:
      return { ...state, lastStatus: action.status, error: action.error};
    case GET_SECTIONS:
      return { ...state, lastStatus: action.status, all_sections: action.all_sections, error: null};
    case GET_SECTIONS_ERROR:
      return { ...state, lastStatus: action.status, all_sections: [], error: action.error};
    default:
      return state;
  }
}
