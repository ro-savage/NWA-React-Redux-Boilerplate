/* ACTIONS */
import debug from 'debug'
import { browserHistory } from 'react-router'
import { validateLogin } from '../../../api/auth'
import { toastr } from 'react-redux-toastr'

if (__DEBUG__) {
  debug.enable('user-auth:*')
}

const log = debug('user-auth:debug')

export const LOGIN_SUCCESS = '@@user-auth/LOGIN_REQUEST'
export const TESTING = 'TESTING'

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export const requestLogin = (creds) => {
  return dispatch => {
    validateLogin(creds).then((data) => {
      toastr.success('Login', 'Login Successful')
      dispatch(loginSuccess(data))
      browserHistory.push('/home')
    }).catch((err) => {
      if (err && err.type && err.message) {
        toastr.error(err.type, err.message)
      } else {
        toastr.error('Login error', 'Unknown error')
      }
    })
  }
}

/* REDUCERS */
export function userAuthReducer(state = { isAuthenticated: false }, action) {
  let newState

  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success')
      newState = {
        ...state,
        isAuthenticated: true,
        user: action.user,
        message: 'success!',
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
