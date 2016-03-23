// ******* ACTIONS ********
import debug from 'debug'

if (__DEBUG__) {
  debug.enable('layout:*')
}

const log = debug('layout:debug')

export const TOGGLE_MENU = '@@layout/TOGGLE_MENU'

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  }
}

// ******* REDUCERS ********

export function layoutReducer(state = { menuOpen: false }, action) {
  let newState

  switch (action.type) {
    case TOGGLE_MENU:
      newState = {
        ...state,
        menuOpen: !state.menuOpen,
      }
      break
    default:
      newState = state
  }

  if (newState !== state) {
    // only log if state has changed
    log('action:', action, 'state:', state, 'newState:', newState)
  }

  return newState
}
