import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation } from 'components'
import { Login } from 'pages'

import { LOGIN_PAGE, HOME } from 'constants/routes'
import { PicList } from 'components/PicList'

const App: FC = () => (
  <Router>
    <CssBaseline />
    <Navigation />
    <Switch>
      <Route path={HOME} exact>
        <Header buttonText="I am button text" />
        <PicList />
      </Route>
      <Route path={LOGIN_PAGE} exact>
        <Login />
      </Route>
    </Switch>
  </Router>
)

export default App
