import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux'
import App from './components/App.tsx'
import { store } from './store'
import { checkAuthAction, fetchUserDataAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

store.dispatch(checkAuthAction());
store.dispatch(fetchUserDataAction());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>,
)
