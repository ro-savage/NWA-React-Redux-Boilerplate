
import { getProfile } from '../../../api/user'
import { setUser, clearUser } from '../user/user-actions'
import { showSpinner, hideSpinner } from '../spinner/spinner'

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE'
export const LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS'
export const LOCAL_STORAGE_KEY = 'redux:auth'

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  token: null,
}

export const loginRequestAction = (creds) => {
  return {
    type: LOGIN_REQUEST,
    state: initialState,
    creds,
  }
}

const persistState = (state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
}

export const getState = () => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY)
  let state: ?AuthState

  if (storedState) {
    state = JSON.parse(storedState)
  } else {
    state = initialState
  }

  return state
}

export const loginSuccess = () => {
  const state = {
    isLoading: false,
    isAuthenticated: true,
    isAdmin: true,
    token: 'eyJ0eXAasdfiOi',
  }

  persistState(state)

  return {
    type: LOGIN_SUCCESS,
    state,
  }
}

export const loginFailure = () => {
  persistState(initialState)

  return {
    type: LOGIN_FAILURE,
    state: initialState,
  }
}

export const loginRequest = () => {
  // Returning a function works because `redux-thunk` middleware is installed:
  // https://github.com/gaearon/redux-thunk
  // See `configure-store.js`.
  console.log('LoginRequest fired')

  const creds = {
    user: 'admin',
    pass: 'admin',
  }

  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  }

  fetch('http://private-9ad5c-macvadhorizon.apiary-mock.com/auth', config)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })


  return dispatch => {
    dispatch(loginRequestAction(creds))
    dispatch(showSpinner('site.message.loggingIn'))

    getProfile().then(
    response => {
      // insert a short delay to simulate service call delay - remove in real application
      setTimeout(() => {
        dispatch(loginSuccess(response))
        dispatch(hideSpinner())
        dispatch(setUser(response))
      }, 1500)
    },
    () => {
      dispatch(loginFailure())
      dispatch(hideSpinner())
      dispatch(clearUser())
    }
    )
  }
}

export const logoutRequest = () => dispatch => {
  dispatch({
    type: LOGOUT_REQUEST,
  })
  dispatch(showSpinner('site.message.loggingOut'))

  // insert a short delay to simulate service call delay - remove in real application
  setTimeout(() => {
    persistState(initialState)
    dispatch(clearUser())
    dispatch(hideSpinner())
    dispatch({
      type: LOGOUT_SUCCESS,
      state: initialState,
    })
  }, 1500)
}
