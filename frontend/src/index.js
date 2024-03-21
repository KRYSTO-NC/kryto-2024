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
import LandingScreen from './screens/public/landingScreen/LandingScreen'
import NotFound from './screens/NotFound'
import LoginScreen from './screens/public/loginScreen/LoginScreen'
import Dashboard from './screens/admin/dashboard/Dashboard'
import ProductsScreen from './screens/public/productsScreen/ProductsScreen'
import ProductScreen from './screens/public/productScreen/ProductScreen'
import PartenaireDashboard from './screens/private/partenaire/partenaireDashboard/PartenaireDashboard'
import AdminProducts from './screens/admin/adminProducts/AdminProducts'
import AdminProductEditScreen from './screens/admin/adminProductEditScreen/AdminProductEditScreen'
import AdminUsersList from './screens/admin/adminUsersList/AdminUsersList'
import AdminUserEdit from './screens/admin/adminUserEdit/AdminUserEdit'
import AboutScreen from './screens/public/aboutScreen/AboutScreen'
import AdminMessages from './screens/admin/adminMessages/AdminMessages'
import AdminMessage from './screens/admin/adminMessage/AdminMessage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<LandingScreen />}></Route>
      <Route path="/connexion" element={<LoginScreen />}></Route>
      <Route path="/nos-produits" element={<ProductsScreen />}></Route>
      <Route path="/a-propos" element={<AboutScreen />}></Route>
      <Route path="/produit/:id" element={<ProductScreen />}></Route>

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/dashboard-partenaire"
          element={<PartenaireDashboard />}
        ></Route>
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/products" element={<AdminProducts />}></Route>
        <Route path="/admin/users" element={<AdminUsersList />}></Route>
        <Route path="/admin/messages" element={<AdminMessages />}></Route>
        <Route path="/admin/message/:id" element={<AdminMessage />}></Route>
        <Route path="/admin/user-edit/:id" element={<AdminUserEdit />} />

        <Route
          path="/admin/product-edit/:id"
          element={<AdminProductEditScreen />}
        ></Route>
      </Route>
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
