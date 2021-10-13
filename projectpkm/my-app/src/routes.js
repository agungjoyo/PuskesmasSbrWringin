import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './View/DashboardKIA/layouts/dashboard';
import LogoOnlyLayout from './View/DashboardKIA/layouts/LogoOnlyLayout';
//
import Login from './View/DashboardKIA/pages/Login';
import Register from './View/DashboardKIA/pages/Register';
import DashboardApp from './View/DashboardKIA/pages/DashboardApp';
import Products from './View/DashboardKIA/pages/Products';
import Blog from './View/DashboardKIA/pages/Blog';
import User from './View/DashboardKIA/pages/User';
import NotFound from './View/DashboardKIA/pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: '/dashboard', element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
