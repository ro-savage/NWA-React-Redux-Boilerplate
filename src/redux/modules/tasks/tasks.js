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
export const MAKE_CURRENT = '@@tasks/MAKE_CURRENT'


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

export function makeTaskCurrent(id = 2) {
  return {
    type: MAKE_CURRENT,
    id,
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
const defaultTaskState = {
  tasks: {
    0: {
      id: 0,
      title: 'Wonder #0',
      productDesc: 'Sed tincidunt sapien iaculis metus euismod venenatis. Aliquam cursus turpis nec tempor gravida. In venenatis, leo at consectetur molestie, diam enim luctus massa, ut consequat est nunc non velit. Pellentesque cursus, justo id ornare ultrices, augue nibh sodales metus, eu ultrices felis dolor id neque.',
      productImgs: ['http://placeimg.com/100/100/animals', 'http://placeimg.com/100/100/arch', 'http://placeimg.com/100/100/nature'],
    },
  },
  current: 0 }

export function taskReducer(state = defaultTaskState, action) {
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
            productDesc: 'This is a placeholder product description and some place holder images too.',
            productImgs: ['http://placeimg.com/100/100/people', 'http://placeimg.com/100/100/tech', 'http://placeimg.com/100/100/animals/grayscale'],
          },
        },
      }
      break
    }
    case MAKE_CURRENT: {
      newState = {
        ...state,
        current: action.id,
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
