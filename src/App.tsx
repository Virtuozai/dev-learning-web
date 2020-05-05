import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation } from 'components'
import { Login } from 'pages'

import { LOGIN_PAGE, HOME, PROFILE } from 'constants/routes'
import Profile from 'pages/Profile'

const App: FC = () => (
  <Router>
    <CssBaseline />
    <Navigation />
    <Switch>
      <Route path={HOME} exact>
        <Header buttonText="I am button text" />
      </Route>
      <Route path={LOGIN_PAGE} exact>
        <Login />
      </Route>
      <Route path={PROFILE} exact>
        <Profile
          userName="jeff"
          userLastname="jefferson"
          email="yo@gmail.com"
          teamName="genericTeam"
          developerRole="junior"
        />
      </Route>
    </Switch>
  </Router>
)

export default App
