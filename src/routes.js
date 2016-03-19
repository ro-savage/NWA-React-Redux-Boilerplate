import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { requireAuthentication as restrict } from 'containers/AuthenticatedComponent'

import AppContainer from 'containers/AppContainer'
import HeroPageLayout from 'containers/HeroPageLayout'
import AdminPageLayout from 'containers/AdminPageLayout'
import LandingPage from 'pages/LandingPage/LandingPage'
import AboutPage from 'pages/AboutPage/AboutPage'
import ProfileEditPage from 'pages/ProfileEditPage/ProfileEditPage'

import GridPageLayout from 'containers/GridPageLayout'
import StyleGuidePage from 'pages/StyleGuidePage/StyleGuidePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import GridPage from 'pages/GridPage/GridPage'

export default(
  // Route components without path will render their children...
  <Route component={AppContainer}>
    <Route component={GridPageLayout}>
      <Route path="/styleguide" component={StyleGuidePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/grid" component={GridPage} />

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
