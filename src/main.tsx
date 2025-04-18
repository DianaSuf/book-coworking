import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import { store } from './store';
import { AuthorizationStatus } from './const';
import { checkAuthAction, fetchUserDataAction, fetchAdminDataAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { keycloak } from './keycloak';

function Root() {

  useEffect(() => {
    store.dispatch(checkAuthAction()).then(() => {
      const state = store.getState();
      const authorizationStatus = state.user.authorizationStatus;

      if (authorizationStatus === AuthorizationStatus.USER) {
        store.dispatch(fetchUserDataAction());
      }

      if (authorizationStatus === AuthorizationStatus.ADMIN) {
        store.dispatch(fetchAdminDataAction());
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  );
}

keycloak.init({
  onLoad: "login-required",
  silentCheckSsoRedirectUri: window.location.origin + "/check-sso.html",
})
.then(() => {
  if (keycloak.token) {
    localStorage.setItem("token", keycloak.token);

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Root />
      </StrictMode>,
    );
  } else {
    console.error("Ошибка аутентификации: токен отсутствует");
  }
});