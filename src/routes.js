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

export default(
  // Route components without path will render their children...
  <Route component={AppContainer}>
    <Route path="/styleguide" component={StyleGuidePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/tasks" component={TaskPage} >
      <Route path="/tasks/:taskId" component={TaskPage} />
    </Route>
    { /* until a match is found... */ }
    <Route component={HeroPageLayout}>
      <Route path="/" component={LandingPage} />
      { /* Routes without a component will render their children: */ }
      <Route path="/pages" >
        <IndexRedirect to="about-us" />
        <Route path="about-us" component={AboutPage} />
        <Route path="faq" component={AboutPage} />
      </Route>
    </Route>

    <Route path="/account" component={AdminPageLayout}>
      <Route path="/profile/edit" component={restrict(ProfileEditPage)} />
    </Route>
  </Route>
)
