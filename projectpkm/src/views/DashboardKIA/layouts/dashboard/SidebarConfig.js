import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import chartLineData from "@iconify/icons-carbon/chart-line-data";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    key: "1",
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    key: "2",
    title: "user",
    path: "/dashboard/user",
    icon: getIcon(peopleFill),
  },
  {
    key: "3",
    title: "dataCoc",
    path: "/dashboard/data-coc",
    icon: getIcon(chartLineData),
  },
  {
    key: "4",
    title: "product",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },
  {
    key: "5",
    title: "blog",
    path: "/dashboard/blog",
    icon: getIcon(fileTextFill),
  },
  {
    key: "6",
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  {
    key: "7",
    title: "register",
    path: "/register",
    icon: getIcon(personAddFill),
  },
  {
    key: "8",
    title: "Graphic",
    path: "/dashboard/graphic",
    icon: getIcon(chartLineData),
  },
];

export default sidebarConfig;
