import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

function Root() {

  // useEffect(() => {
  //   store.dispatch(checkAuthAction());
  // }, []);

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
  </StrictMode>,
);
