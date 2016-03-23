import thunk from 'redux-thunk'
import rootReducer from './root-reducer'
import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'

function withDevTools(middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : require('../containers/DevTools').instrument()
  return compose(middleware, devTools)
}

export default function configureStore(initialState, browserHistory) {
  let middleware = applyMiddleware(thunk)
  let routerMiddleware

  if (browserHistory) {
    routerMiddleware = syncHistory(browserHistory)
    middleware = applyMiddleware(thunk, routerMiddleware)
  }


  if (__DEBUG__) {
    // use devtools in debug environment
    middleware = withDevTools(middleware)
  }

  const store = middleware(createStore)(rootReducer, initialState)

  if (__DEBUG__) {
    // listen for route replays (devtools)
    if (browserHistory) {
      routerMiddleware.listenForReplays(store)
    }
  }

  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      const nextRootReducer = require('./root-reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
