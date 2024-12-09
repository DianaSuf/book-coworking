import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.User || authorizationStatus === AuthorizationStatus.Admin
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}

export default PrivateRoute;
