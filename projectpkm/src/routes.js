import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

// pages for this product
import Components from "views/Components/Components";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import LoginPage from "views/LoginPage/LoginPage";
import LogoOnlyLayout from "views/DashboardKIA/layouts/LogoOnlyLayout";

import DashboardLayout from "views/DashboardKIA/layouts/dashboard";
import DashboardApp from "views/DashboardKIA/pages/DashboardApp";
import User from "views/DashboardKIA/pages/User";
import Products from "views/DashboardKIA/pages/Products";
import Blog from "views/DashboardKIA/pages/Blog";
import NotFound from "views/DashboardKIA/pages/Page404";
import Login from "views/DashboardKIA/pages/Login";
import Register from "views/DashboardKIA/pages/Register";
import DataCoc from "views/DashboardKIA/pages/DataCoc";

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "/dashboard", element: <Navigate to="/dashboard/app" /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "data-coc", element: <DataCoc /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/components" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/components",
      element: <Components />,
      children: [
        { path: "*", element: <Navigate to="/404" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/404",
      element: <NotFound />,
      children: [{ path: "*", element: <Navigate to="/404" replace /> }],
    },
    {
      path: "/landing-page",
      element: <LandingPage />,
    },
    {
      path: "/profile-page",
      element: <ProfilePage />,
    },
    {
      path: "/login-page",
      element: <LoginPage />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
