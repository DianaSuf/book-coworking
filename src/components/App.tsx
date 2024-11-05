import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppRoute } from '../const'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
              path={AppRoute.NotFound}
              element={<ErrorScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
