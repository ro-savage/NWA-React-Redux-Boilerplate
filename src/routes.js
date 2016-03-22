import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { requireAuthentication as restrict } from 'containers/AuthenticatedComponent'

import AppContainer from 'containers/AppContainer'
import HeroPageLayout from 'containers/HeroPageLayout'
import AdminPageLayout from 'containers/AdminPageLayout'
import LandingPage from 'pages/LandingPage/LandingPage'
import AboutPage from 'pages/AboutPage/AboutPage'
import ProfileEditPage from 'pages/ProfileEditPage/ProfileEditPage'

import StyleGuidePage from 'pages/StyleGuidePage/StyleGuidePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import TaskPage from 'pages/TaskPage/TaskPage'

import { checkTokenAuth } from './redux/modules/user-auth/user-auth'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const state = store.getState()
      const isAuthenticated = state.userAuth.isAuthenticated
      if (!isAuthenticated) {
        // Not authenticated. Redirect to login page
        replace('/login')
      }
      // Allowed. So let them continue
      cb()
    }

    const { userAuth: { isAuthenticated } } = store.getState()

    if (!isAuthenticated) {
      store.dispatch(checkTokenAuth())
        .then(() => {
          checkAuth()
        })
        .catch(() => {
          checkAuth()
        })
    } else {
      checkAuth()
    }
  }
  return (
    // Route components without path will render their children...
    <Route component={AppContainer}>
      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="/styleguide" component={StyleGuidePage} />
        <Route path="/tasks" component={TaskPage} >
          <Route path="/tasks/:taskId" component={TaskPage} />
        </Route>
        { /* until a match is found... */ }
        <Route component={HeroPageLayout}>
          <Route path="/home" component={LandingPage} />
          { /* Routes without a component will render their children: */ }
          <Route path="/pages" >
            <IndexRedirect to="about-us" />
            <Route path="about-us" component={AboutPage} />
            <Route path="faq" component={AboutPage} />
          </Route>
        </Route>
      </Route>
      <Route path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />


      <Route path="/account" component={AdminPageLayout}>
        <Route path="/profile/edit" component={restrict(ProfileEditPage)} />
      </Route>
    </Route>
  )
}
