import React, { FC, useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Navigation, PrivateRoute } from 'components'
import { Login, Profile, Members, Learning, Subject, Calendar, UserSubject } from 'pages'

import { getCurrentUser } from 'data/api/users'

import * as routes from 'constants/routes'
import { User } from 'types/models/user'

export const UserContext = createContext<User | null>(null)

const App: FC = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const checkIfLoggedOn = async () => {
    const response = await getCurrentUser()

    if (!response?.data) {
      setIsLoggedOn(false)

      return response
    }

    setIsLoggedOn(true)
    setUser(response.data)

    return response
  }

  useEffect(() => {
    checkIfLoggedOn()
  }, [])

  return (
    <UserContext.Provider value={user}>
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
          <PrivateRoute isLoggedOn={isLoggedOn} path={routes.USER_SUBJECT}>
            <UserSubject />
          </PrivateRoute>
          <PrivateRoute isLoggedOn={isLoggedOn} path={routes.CALENDAR}>
            <Calendar />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App
