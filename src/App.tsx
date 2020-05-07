import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation } from 'components'
import { Login } from 'pages'

import { LOGIN_PAGE, HOME, SETTINGS } from 'constants/routes'
import ImageList from 'components/ImageList'
import Settings from 'pages/Settings'

const App: FC = () => (
  <Router>
    <CssBaseline />
    <Navigation />
    <Switch>
      <Route path={HOME} exact>
        <Header buttonText="I am button text" />
        <ImageList />
      </Route>
      <Route path={LOGIN_PAGE} exact>
        <Login />
      </Route>
      <Route path={SETTINGS} exact>
        <Settings />
      </Route>
    </Switch>
  </Router>
)

export default App
