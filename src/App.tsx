import React, { FC, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation, PrivateRoute } from 'components'
import { Login, Profile, Settings } from 'pages'

import { getCurrentUser } from 'data/api/users'

import { HOME, PROFILE, MEMBERS, LOGIN_PAGE, SETTINGS } from 'constants/routes'

const App: FC = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(false)

  const checkIfLoggedOn = async () => {
    const response = await getCurrentUser()

    if (!response) {
      return setIsLoggedOn(false)
    }

    return setIsLoggedOn(true)
  }

  checkIfLoggedOn()
  return (
    <Router>
      <CssBaseline />
      {isLoggedOn && <Navigation />}
      <Switch>
        <Route path={LOGIN_PAGE} exact>
          <Login checkIfLoggedOn={checkIfLoggedOn} />
        </Route>
        <PrivateRoute isLoggedOn={isLoggedOn} path={PROFILE}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={MEMBERS}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={SETTINGS}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={HOME}>
          <Header buttonText="I am button text" />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
