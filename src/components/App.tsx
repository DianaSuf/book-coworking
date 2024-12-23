import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route} from 'react-router-dom'
import { AppRoute } from '../const'
import HistoryRouter from './history-route'
import browserHistory from '../browser-history'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hooks'
import { getAuthorizationStatus } from '../store/slices/user-slice'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import ProfileScreen from '../pages/profile-screen/profile-screen'
import ConfirmScreen from '../pages/confirm-screen/confirm-screen'
import NotifyScreen from '../pages/notify-screen/notify-screen'
import BookScreen from '../pages/book-screen/book-screen'

function App() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Profile}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <ProfileScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Notify}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <NotifyScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Book}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <BookScreen />
              </PrivateRoute>
            }
          />
          <Route
              path={AppRoute.Confirm}
              element={<ConfirmScreen />}
          />
          <Route
              path={AppRoute.NotFound}
              element={<ErrorScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  )
}

export default App
