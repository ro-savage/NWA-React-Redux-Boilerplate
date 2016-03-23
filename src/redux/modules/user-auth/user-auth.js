// ******* ACTIONS ********
import debug from 'debug'
import { browserHistory } from 'react-router'
import { validateLogin, validateToken } from '../../../api/auth'
import { toastr } from 'react-redux-toastr'

if (__DEBUG__) {
  debug.enable('user-auth:*')
}

const log = debug('user-auth:debug')

export const LOGIN_SUCCESS = '@@user-auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = '@@user-auth/LOGIN_FAIL'

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

function loginFail() {
  localStorage.removeItem('userToken')
  return {
    type: LOGIN_FAIL,
  }
}

function getUserToken() {
  return localStorage.getItem('userToken')
}

export const checkTokenAuth = () => {
  const token = getUserToken()

  if (!token) {
    return (dispatch) => {
      dispatch(loginFail())
      toastr.error('Access denied', 'You do not have access to this area. Please login.')
      return Promise.reject() // Return promise rejection
    }
  }


  return (dispatch) => { // Return func
    return validateToken(token).then((data) => { // return promise
      dispatch(loginSuccess(data))
    }).catch((err) => {
      dispatch(loginFail())

      if (err && err.type && err.message) {
        toastr.error(err.type, err.message)
      } else {
        toastr.error('Login error', 'Unknown error')
      }
    })
  }
}

export const requestLogin = (creds) => {
  return dispatch => {
    validateLogin(creds).then((data) => {
      toastr.success('Login', 'Login Successful')
      dispatch(loginSuccess(data))
      browserHistory.push('/home')
      localStorage.setItem('userToken', data.token)
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
      newState = {
        ...state,
        isAuthenticated: true,
        token: action.user.token,
        user: { email: action.user.email, role: action.user.role },
        message: 'success!',
      }
      break
    case LOGIN_FAIL:
      newState = {
        ...state,
        isAuthenticated: false,
        token: '',
        user: {},
        message: 'fail!',
      }
      break
    default:
      return state
  }

  if (newState !== state) {
    // only log if state has changed
    log('action:', action, 'state:', state, 'newState:', newState)
  }

  return newState
}
