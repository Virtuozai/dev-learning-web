import React, { FC, ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_PAGE } from 'constants/routes'

type Props = {
  path: string
  isLoggedOn: boolean
  children: ReactNode
}
const PrivateRoute: FC<Props> = ({ isLoggedOn, children, path }: Props) => {
  return (
    <Route
      path={path}
      exact
      render={({ location }) => {
        if (!isLoggedOn)
          return <Redirect to={{ pathname: LOGIN_PAGE, state: { from: location } }} />

        return children
      }}
    />
  )
}

export default PrivateRoute
