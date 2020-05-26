import React, { FC, useState, createContext, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { blueGrey, blue, grey } from '@material-ui/core/colors'

import { Navigation, PrivateRoute } from 'components'
import {
  Login,
  Profile,
  Members,
  Learning,
  Subject,
  Calendar,
  UserSubject,
  Team,
  SettingsPage,
} from 'pages'

import { getCurrentUser } from 'data/api/users'

import * as routes from 'constants/routes'
import { User } from 'types/models/user'
import { getItem } from 'libs/utils/localStorageManager'

export const UserContext = createContext<User | null>(null)

const App: FC = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getItem('dark') === 'enabled')

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

  const checkIfDarkMode = () => {
    if (getItem('dark') === 'enabled') {
      setIsDarkMode(true)

      return
    }

    setIsDarkMode(false)
  }

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: isDarkMode ? blueGrey : blue,
          grey: {
            100: isDarkMode ? blueGrey[300] : grey[100],
          },
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <Router>
          <CssBaseline />
          {isLoggedOn && (
            <Navigation
              checkIfLoggedOn={checkIfLoggedOn}
              isDarkMode={isDarkMode}
              checkIfDarkMode={checkIfDarkMode}
            />
          )}
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
            <PrivateRoute isLoggedOn={isLoggedOn} path={routes.USER}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute isLoggedOn={isLoggedOn} path={routes.TEAM}>
              <Team />
            </PrivateRoute>
            <PrivateRoute isLoggedOn={isLoggedOn} path={routes.SETTINGS}>
              <SettingsPage />
            </PrivateRoute>
            <PrivateRoute isLoggedOn={isLoggedOn} path={routes.HOME}>
              <Calendar />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
