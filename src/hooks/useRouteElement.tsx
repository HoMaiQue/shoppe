import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from 'src/constant'
import { AppContext } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
// import NotFound from 'src/pages/NotFound'
// import ProductDetail from 'src/pages/ProductDetail'
// import UserLayout from 'src/pages/User/layouts/UserLayout'
// import ChangePassword from 'src/pages/User/pages/ChangePassword'
// import HistoryPurchase from 'src/pages/User/pages/HistoryPuchase'
// import Profile from 'src/pages/User/pages/Profile'
// import Cart from 'src/pages/cart'
// import RegisterLayout from '../layouts/RegisterLayout'
// import Login from '../pages/Login'
// import ProductList from '../pages/ProductList'
// import Register from '../pages/Register'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const Login = lazy(() => import('../pages/Login'))
const ProductList = lazy(() => import('../pages/ProductList'))
const Profile = lazy(() => import('../pages/User/pages/Profile'))
const Register = lazy(() => import('../pages/Register'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Cart = lazy(() => import('../pages/Cart'))
const ChangePassword = lazy(() => import('../pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('../pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('../pages/NotFound'))
export const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElement
}
