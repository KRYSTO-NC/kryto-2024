import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import LandingScreen from './screens/admin/landingScreen/LandingScreen'
import LoginScreen from './screens/admin/loginScreen/LoginScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}

      <Route path="/" element={<LandingScreen />}></Route>
      <Route path="/connexion" element={<LoginScreen />}></Route>

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}></Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}></Route>
    </Route>,
  ),
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
