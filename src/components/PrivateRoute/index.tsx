// eslint-disable-next-line import/named
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom'
import { FC } from 'react'

import { useAppSelector } from '../../hooks/hook'

type TPrivateRoute = RouteProps & {
  redirectTo: string
}

interface IStateLocation {
  from: {
    pathname: string
  }
}

const PrivateRoute: FC<TPrivateRoute> = ({ redirectTo, ...props }) => {
  const user = useAppSelector((state) => state.user.user)
  const location = useLocation<IStateLocation>()
  if (!user) {
    return <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
  }

  return <Route {...props} />
}

export default PrivateRoute
