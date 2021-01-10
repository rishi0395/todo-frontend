import { projectsSync, tasksSync } from '../constants';
import { axios } from '../helpers/axios';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_SELECT_PROJECT = 'SET_SELECT_PROJECT';
export const UPDATE_PROJECTS = 'UPDATE_PROJECTS';
export const UPDATE_TASKS = 'UPDATE_TASKS';
export const ARCHIVED_TASKS = 'ARCHIVED_TASKS';
export const MODIFY_TASK = 'MODIFY_TASK';
export const SET_SELECTED_PROJECT_TASKS = 'SET_SELECTED_PROJECT_TASKS';
export const DELETE_AND_UPDATE_PROJECT = 'DELETE_AND_UPDATE_PROJECT';
export const DELETE_AND_UPDATE_TASKS = 'DELETE_AND_UPDATE_TASKS';

const initialState = {
  tasks: [],
  projects: [],
  selectedProject: 'INBOX',
  selectedProjectTask: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case DELETE_AND_UPDATE_PROJECT:
      return {
        ...state,
        projects: action.payload,
      };
    case DELETE_AND_UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case SET_SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
      };
    case UPDATE_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ARCHIVED_TASKS:
      return {
        ...state,
        archivedTasks: state.tasks.filter((task) => task.archived !== false),
      };

    case MODIFY_TASK: {
      const { payload } = action;
      let stateTasks = state.tasks;
      let foundIndex = stateTasks.findIndex((ele) => ele._id === payload._id);
      stateTasks[foundIndex] = payload;

      return {
        ...state,
        tasks: stateTasks,
      };
    }
    case SET_SELECTED_PROJECT_TASKS:
      return {
        ...state,
        selectedProjectTask: action.payload,
      };
    default:
      return state;
  }
};

export const fetchTaskSuccess = (tasks) => ({
  type: FETCH_TASKS,
  payload: tasks,
});

export const fetchProjectSuccess = (projects) => ({
  type: FETCH_PROJECTS,
  payload: projects,
});

export const setSelectedProject = (selectedProject) => ({
  type: SET_SELECT_PROJECT,
  payload: selectedProject,
});

export const setProjects = (projects) => ({
  type: UPDATE_PROJECTS,
  payload: projects,
});

export const updateTasks = (task) => ({
  type: UPDATE_TASKS,
  payload: task,
});

export const modifyTask = (task) => ({
  type: MODIFY_TASK,
  payload: task,
});

export const deleteAndUpdateProject = (projects) => ({
  type: DELETE_AND_UPDATE_PROJECT,
  payload: projects,
});

export const deleteAndUpdateTasks = (projects) => ({
  type: DELETE_AND_UPDATE_TASKS,
  payload: projects,
});

export const setSelectedProjectTask = (tasks) => {
  console.log(tasks);
  return {
    type: SET_SELECTED_PROJECT_TASKS,
    payload: tasks,
  };
};

export const fetchTasks = () => (dispatch) => {
  axios
    .get(tasksSync)
    .then((res) => {
      const allTasks = res.data.map((task) => task);
      dispatch(fetchTaskSuccess(allTasks));
    })
    .catch((err) => {
      console.log(err, 'error from fetchTasks');
    });
};

export const fetchProjects = () => (dispatch) => {
  axios
    .get(projectsSync)
    .then((res) => {
      const allProjects = res.data.map((project) => {
        return {
          docId: project.id,
          ...project,
        };
      });
      dispatch(fetchProjectSuccess(allProjects));
    })
    .catch((err) => {
      console.log(err, 'error from fetchProject');
    });
};

export default reducer;
