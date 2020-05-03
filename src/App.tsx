import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header } from 'components'
import { Login } from 'pages'

import { LOGIN_PAGE, HOME } from 'constants/routes'
import ImageList from 'components/ImageList'

const App: FC = () => (
  <Router>
    <CssBaseline />
    <Switch>
      <Route path={HOME} exact>
        <Header buttonText="I am button text" />
        <ImageList />
      </Route>
      <Route path={LOGIN_PAGE} exact>
        <Login />
      </Route>
    </Switch>
  </Router>
)

export default App
