import {combineReducers} from "redux";

import Loader from './loader.reducer';
import Task from './task.reducer';
import Section from './section.reducer';

export default combineReducers({
  loader: Loader,
  task: Task,
  section: Section
});
