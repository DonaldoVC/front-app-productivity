import {
  SAVE_TASK,
  SAVE_TASK_ERROR,
  GET_TASKS,
  GET_TASKS_ERROR,
  MODIFY_TASK,
  MODIFY_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_ERROR
} from '../constants';

const initialState = {
  all_tasks: [],
  lastStatus: 0,
  error: null
};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TASK:
      const all_tasks = state.all_tasks;
      all_tasks.push(action.task);

      return { ...state, all_tasks, lastStatus: action.status, error: null};
    case SAVE_TASK_ERROR:
      return { ...state, lastStatus: action.status, error: action.error};
    case GET_TASKS:
      return { ...state, all_tasks: action.all_tasks, lastStatus: action.status, error: null};
    case GET_TASKS_ERROR:
      return { ...state, all_tasks: [], lastStatus: action.status, error: action.error};
    case MODIFY_TASK:
      const index = state.all_tasks.findIndex(a => a._id === action.task._id);
      state.all_tasks[index] = action.task;

      return { ...state, lastStatus: action.status, all_tasks: state.all_tasks, error: null};
    case MODIFY_TASK_ERROR:
      return { ...state, lastStatus: action.status, error: action.error};
    case DELETE_TASK:
      const all_task = state.all_tasks;
      const indexDelete = all_task.findIndex(a => a._id === action.task._id);
      all_task.splice(indexDelete, 1);

      return { ...state, lastStatus: action.status, all_tasks: all_task, error: null};
    case DELETE_TASK_ERROR:
      return { ...state, lastStatus: action.status, error: action.error};
    default:
      return state;
  }
}
