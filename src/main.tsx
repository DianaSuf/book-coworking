import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import { keycloak } from './keycloak';

function Root() {

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  );
}

keycloak.init({
  // onLoad: "check-sso",
  silentCheckSsoRedirectUri: window.location.origin + "/check-sso.html",
})
.then(() => {
  if (keycloak.token) {
    localStorage.setItem("token", keycloak.token);
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
});
