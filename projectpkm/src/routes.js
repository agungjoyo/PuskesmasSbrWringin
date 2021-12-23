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
import DataCocImunisasi from "views/DashboardKIA/pages/DataCocImunisasi";
import DataCocGizi from "views/DashboardKIA/pages/DataCocGizi";
import InsertData from "views/DashboardKIA/pages/InsertData";
import InsertDataImunisasi from "views/DashboardKIA/pages/InsertDataImunisasi";
import InsertDataGizi from "views/DashboardKIA/pages/InsertDataGizi";
import Graphic from "views/DashboardKIA/pages/Graphic";
import GraphicImun from "views/DashboardKIA/pages/GraphicImun";
import GraphicGizi from "views/DashboardKIA/pages/GraphicGizi";
import PenggunaBaru from "views/DashboardKIA/pages/PenggunaBaru";
export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace={true} /> },
        { path: "/dashboard", element: <Navigate to="/dashboard/app" /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "data-coc/kia", element: <DataCoc /> },
        { path: "data-coc/imun", element: <DataCocImunisasi /> },
        { path: "data-coc/gizi", element: <DataCocGizi /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "InsertData", element: <InsertData /> },
        { path: "InsertDataImunisasi", element: <InsertDataImunisasi /> },
        { path: "InsertDataGizi", element: <InsertDataGizi /> },
        { path: "graphic/kia", element: <Graphic /> },
        { path: "graphic/imunisasi", element: <GraphicImun /> },
        { path: "graphic/gizi", element: <GraphicGizi /> },
        { path: "PenggunaBaru", element: <PenggunaBaru /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/landing-page" replace={true} /> },
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
    { path: "*", element: <Navigate to="/404" replace={true} /> },
  ]);
}
