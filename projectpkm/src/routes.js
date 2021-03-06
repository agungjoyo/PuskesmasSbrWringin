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
import DataCocGiziFinal from "views/DashboardKIA/pages/DataCocGiziFinal";
import DataIndikatorIbu from "views/DashboardKIA/pages/DataIndikatorIbu";
import InsertData from "views/DashboardKIA/pages/InsertData";
import InsertTripleEliminasiKIA from "views/DashboardKIA/pages/InsertTripleEliminasiKIA";
import InsertDataKB from "views/DashboardKIA/pages/InsertDataKB";
import InsertDataImunisasi from "views/DashboardKIA/pages/InsertDataImunisasi";
import InsertDataGizi from "views/DashboardKIA/pages/InsertDataGizi";
import InsertDataK1 from "views/DashboardKIA/pages/InsertDataK1";
import InsertDataParipurna from "views/DashboardKIA/pages/InsertDataParipurna";
import Graphic from "views/DashboardKIA/pages/Graphic";
import GraphicImun from "views/DashboardKIA/pages/GraphicImun";
import GraphicGizi from "views/DashboardKIA/pages/GraphicGizi";
import IndexGraphicCoc from "views/DashboardKIA/pages/IndexGraphicCoc";
import InsertDataIL from "views/DashboardKIA/pages/InsertDataIL";
import InsertDataBulin from "views/DashboardKIA/pages/InsertDataBulin";

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
        { path: "DataCOCGizi", element: <DataCocGiziFinal /> },
        { path: "DataCocIndikatorIbu", element: <DataIndikatorIbu /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "InsertData", element: <InsertData /> },
        {
          path: "InsertTripleEliminasiKIA",
          element: <InsertTripleEliminasiKIA />,
        },
        {
          path: "InsertDataBulin",
          element: <InsertDataBulin />,
        },
        { path: "InsertDataKB", element: <InsertDataKB /> },
        { path: "InsertDataImunisasi", element: <InsertDataImunisasi /> },
        { path: "InsertDataIL", element: <InsertDataIL /> },
        { path: "InsertDataGizi", element: <InsertDataGizi /> },
        { path: "InsertDataK1", element: <InsertDataK1 /> },
        { path: "InsertDataParipurna", element: <InsertDataParipurna /> },
        { path: "graphic/coc", element: <IndexGraphicCoc /> },
        { path: "graphic/kia", element: <Graphic /> },
        { path: "graphic/imunisasi", element: <GraphicImun /> },
        { path: "graphic/gizi", element: <GraphicGizi /> },
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
