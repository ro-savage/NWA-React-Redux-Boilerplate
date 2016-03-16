/* ACTIONS */
import debug from 'debug'
import rKeys from 'ramda/src/keys'
import { getTasksData } from '../../../api/tasks'

if (__DEBUG__) {
  debug.enable('tasks-reducer:*')
}

const log = debug('tasks-reducer:debug')

export const SET_TASKS = '@@tasks/SET_TASKS'
export const NEW_TASK = '@@tasks/NEW_TASK'

// const tasks = [{ id: 2, title: 'task2' }, { id: 3, title: 'task3' }]

export function getTasks(tasks) {
  return {
    type: SET_TASKS,
    tasks,
  }
}

export function newTask(task) {
  return {
    type: NEW_TASK,
    task,
  }
}

export const getJsonTasks = () => {
  return dispatch => {
    getTasksData().then((data) => {
      // insert a short delay to simulate service call delay - remove in real application
      setTimeout(() => {
        dispatch(getTasks(data.tasks))
      }, 1500)
    },
    () => {
      console.log('err')
    }
    )
  }
}

/* REDUCERS */
export function taskReducer(state = { tasks: { 0: { id: 0, title: 'Wonder #0' } } }, action) {
  let newState
  switch (action.type) {
    case SET_TASKS:
      // Merge the stats using ES6 spread operator. The second task object will overwrite the first for dupe keys
      newState = {
        ...state,
        tasks: { ...state.tasks, ...action.tasks },
      }
      break
    case NEW_TASK: {
      const newId = getHighestKey(state.tasks) + 1
      newState = {
        ...state,
        tasks: {
          ...state.tasks, [newId]: {
            ...action.task,
            id: newId,
          },
        },
      }
      break
    }

    default:
      newState = state
  }

  if (newState !== state) {
    // only log if state has changed
    log('action:', action, 'state:', state, 'newState:', newState)
  }

  return newState
}

/* HELPERS */
function getHighestKey(tasks) {
  const arr = rKeys(tasks) // Take all the keys a put in arr
  return Math.max(...arr) // spread the arr to numbers, and get the max
}
