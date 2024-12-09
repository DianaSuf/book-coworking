import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route} from 'react-router-dom'
import { AppRoute } from '../const'
import HistoryRouter from './history-route'
import browserHistory from '../browser-history'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hooks'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import ProfileScreen from '../pages/profile-screen/profile-screen'

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <ProfileScreen />
              </PrivateRoute>
            }
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
