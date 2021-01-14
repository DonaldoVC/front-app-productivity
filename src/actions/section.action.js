import axios from "axios";

import {
  GET_SECTIONS,
  GET_SECTIONS_ERROR,
  LOADING,
  SAVE_SECTION,
  SAVE_SECTION_ERROR
} from "../constants";

export const saveSection = (section) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.post(`${process.env.REACT_APP_API}/section`, {data: section});

      dispatch({
        type: SAVE_SECTION,
        section: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: SAVE_SECTION_ERROR,
        error: e,
        status: 500
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    }
  }
}

export const getSections = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.get(`${process.env.REACT_APP_API}/section`);

      dispatch({
        type: GET_SECTIONS,
        all_sections: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: GET_SECTIONS_ERROR,
        error: e,
        status: 500
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    }
  }
}
