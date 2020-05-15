import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation } from 'components'
import { Login, Profile } from 'pages'

import { LOGIN_PAGE, HOME, PROFILE } from 'constants/routes'

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
        <Profile />
      </Route>
    </Switch>
  </Router>
)

export default App
