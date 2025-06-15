import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import { store } from './store';
import { checkAuthAction, fetchNotificationsCountAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import { keycloak } from './keycloak';

function Root() {

  useEffect(() => {
    store.dispatch(checkAuthAction());
    store.dispatch(fetchNotificationsCountAction());
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
.then((authenticated) => {
  if (authenticated) {
    console.log("User is authenticated");
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
});
