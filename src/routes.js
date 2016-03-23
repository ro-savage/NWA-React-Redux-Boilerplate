import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { requireAuthentication as restrict } from 'containers/AuthenticatedComponent'

import AppContainer from 'containers/AppContainer'
import HeroPageLayout from 'containers/HeroPageLayout'
import AdminPageLayout from 'containers/AdminPageLayout'
import LandingPage from 'pages/LandingPage/LandingPage'
import AboutPage from 'pages/AboutPage/AboutPage'
import ProfileEditPage from 'pages/ProfileEditPage/ProfileEditPage'

import AppLayout from 'containers/AppLayout'
import PageLayout from 'containers/PageLayout/PageLayout'
import StyleGuidePage from 'pages/StyleGuidePage/StyleGuidePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import GridPage from 'pages/GridPage/GridPage'
import TasksPage from 'pages/TasksPage/TasksPage'

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
        <Route path="/" component={LandingPage} />
        <Route component={AppLayout}>
          <Route path="/styleguide" component={StyleGuidePage} />
          <Route path="/grid" component={GridPage} />
        </Route>
        <Route component={PageLayout}>
          <Route path="/tasks" component={TasksPage} >
            <Route path="/tasks/:taskId" component={TasksPage} />
          </Route>
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

      <Route path="/login" component={LoginPage} />


      <Route path="/account" component={AdminPageLayout}>
        <Route path="/profile/edit" component={restrict(ProfileEditPage)} />
      </Route>
    </Route>
  )
}
