import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import { store } from './store';
import { AuthorizationStatus } from './const';
import { checkAuthAction, fetchUserDataAction, fetchAdminDataAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function Root() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

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

      setIsAuthChecked(true);
    });
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
