import axios from "axios";

import {
  DELETE_TASK, DELETE_TASK_ERROR,
  GET_TASKS,
  GET_TASKS_ERROR,
  LOADING,
  MODIFY_TASK,
  MODIFY_TASK_ERROR,
  SAVE_TASK,
  SAVE_TASK_ERROR
} from "../constants";

// Guardado de nueva tarea
export const saveTask = (task) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.post(`${process.env.REACT_APP_API}/task`, {data: task});

      dispatch({
        type: SAVE_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: SAVE_TASK_ERROR,
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

// Guardado de 50 tareas en estatus "Finalizada"
export const graph = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      await axios.post(`${process.env.REACT_APP_API}/task/graph`, {});
      const response = await axios.get(`${process.env.REACT_APP_API}/task`);

      dispatch({
        type: GET_TASKS,
        all_tasks: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: SAVE_TASK_ERROR,
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

// Obtención de tareas
export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.get(`${process.env.REACT_APP_API}/task`);

      dispatch({
        type: GET_TASKS,
        all_tasks: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: GET_TASKS_ERROR,
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

// Modificación de tarea (descripción/tiempo estimado)
export const modifyTask = (task) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.put(`${process.env.REACT_APP_API}/task/${task._id}`, {data: task});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
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

// Modificación de status
export const changeStatus = (task) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.put(`${process.env.REACT_APP_API}/task/change/${task._id}`, {data: task});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
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

// Reestablecer tiempo de tarea
export const reset = (task) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.put(`${process.env.REACT_APP_API}/task/reset/${task._id}`, {});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
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

// Eliminación de tarea
export const deleteTask = (task) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        loading: true
      });

      const response = await axios.delete(`${process.env.REACT_APP_API}/task/${task._id}`);

      dispatch({
        type: DELETE_TASK,
        task: response.data,
        status: response.status
      });

      dispatch({
        type: LOADING,
        loading: false
      });
    } catch (e) {
      dispatch({
        type: DELETE_TASK_ERROR,
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

// Guardado de nuevo orden de tarea según usuario.
export const order = (task) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/task/order`, {data: {task}});

      dispatch({
        type: MODIFY_TASK,
        task: response.data,
        status: response.status
      });
    } catch (e) {
      dispatch({
        type: MODIFY_TASK_ERROR,
        error: e,
        status: 500
      });
    }
  }
}
