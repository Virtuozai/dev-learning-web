import React, { FC, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Header, Navigation } from 'components'
import { Login, Profile } from 'pages'

import { getCurrentUser } from 'data/api/users'

import { HOME, PROFILE } from 'constants/routes'

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
        {isLoggedOn && (
          <>
            <Route path={HOME} exact>
              <Header buttonText="I am button text" />
            </Route>
            <Route path={PROFILE} exact>
              <Profile />
            </Route>
          </>
        )}
        <Route>
          <Login checkIfLoggedOn={checkIfLoggedOn} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
