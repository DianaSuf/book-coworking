import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route} from 'react-router-dom'
import { AppRoute } from '../const'
import HistoryRouter from './history-route'
import browserHistory from '../browser-history'
import PrivateRoute from './private-route'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getAuthorizationStatus } from '../store/slices/user-slice'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import ProfileScreen from '../pages/profile-screen/profile-screen'
import ConfirmScreen from '../pages/confirm-screen/confirm-screen'
import NotifyScreen from '../pages/notify-screen/notify-screen'
import BookScreen from '../pages/book-screen/book-screen'
import Modal from './modal/modal';
import ResetPasswordModal from './reset-password-modal/reset-password-modal';
import { closeModal } from '../store/slices/modal-slice';

function App() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const closeCurrentModal = () => {
    dispatch(closeModal());
  };

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          {/* <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          /> */}
          <Route path={AppRoute.Root} element={<MainScreen />}>
            <Route
              path="password"
              element={
                <Modal isOpen onClose={closeCurrentModal}>
                  <ResetPasswordModal onClose={closeCurrentModal} />
                </Modal>
              }
            />
          </Route>
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
              element={<BookScreen />}
          />
          <Route
              path={AppRoute.Confirm}
              element={<ConfirmScreen />}
          />
          {/* <Route
            path={AppRoute.Password}
            element={
              <Modal isOpen onClose={closeCurrentModal}>
                <ResetPasswordModal onClose={closeCurrentModal} />
              </Modal>
            }
          /> */}
          <Route
            path={AppRoute.NotFound}
            element={<ErrorScreen />}
          />
        </Routes>
        {/* <Routes>
          <Route path={AppRoute.Password} element={<Modal isOpen onClose={closeCurrentModal}><ResetPasswordModal onClose={closeCurrentModal} /></Modal>} />
        </Routes> */}
      </HistoryRouter>
    </HelmetProvider>
  )
}

export default App
