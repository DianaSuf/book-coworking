import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}

export default PrivateRoute;
