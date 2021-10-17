import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

import DashboardLayout from "views/DashboardKIA/layouts/dashboard";
import DashboardApp from "views/DashboardKIA/pages/DashboardApp";
import User from "views/DashboardKIA/pages/User";
import Products from "views/DashboardKIA/pages/Products";
import Blog from "views/DashboardKIA/pages/Blog";
import NotFound from "views/DashboardKIA/pages/Page404";

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
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
      ],
    },
    {
      path: "/",
      element: <Components />,
      children: [{ path: "*", element: <Navigate to="/404" /> }],
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
