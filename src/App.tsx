import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation, PrivateRoute } from 'components'
import { Login, Profile, Members } from 'pages'

import { getCurrentUser } from 'data/api/users'

import { HOME, PROFILE, MEMBERS, LOGIN_PAGE } from 'constants/routes'

const App: FC = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(true)

  const checkIfLoggedOn = async () => {
    const response = await getCurrentUser()

    if (!response) {
      setIsLoggedOn(false)

      return response
    }

    setIsLoggedOn(true)

    return response
  }

  checkIfLoggedOn()

  return (
    <Router>
      <CssBaseline />
      {isLoggedOn && <Navigation checkIfLoggedOn={checkIfLoggedOn} />}
      <Switch>
        {!isLoggedOn && (
          <Route path={LOGIN_PAGE} exact>
            <Login checkIfLoggedOn={checkIfLoggedOn} />
          </Route>
        )}
        <PrivateRoute isLoggedOn={isLoggedOn} path={PROFILE}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={MEMBERS}>
          <Members />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={HOME}>
          <Header buttonText="I am button text" />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
