import React, { FC, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation, PrivateRoute } from 'components'
import { Login, Profile, Members, Learning, Subject } from 'pages'

import { getCurrentUser } from 'data/api/users'

import * as routes from 'constants/routes'

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
          <Route path={routes.LOGIN_PAGE} exact>
            <Login checkIfLoggedOn={checkIfLoggedOn} />
          </Route>
        )}
        <PrivateRoute isLoggedOn={isLoggedOn} path={routes.PROFILE}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={routes.MEMBERS}>
          <Members />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={routes.LEARNING}>
          <Learning />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={routes.SUBJECT}>
          <Subject />
        </PrivateRoute>
        <PrivateRoute isLoggedOn={isLoggedOn} path={routes.HOME}>
          <Header buttonText="I am button text" />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
