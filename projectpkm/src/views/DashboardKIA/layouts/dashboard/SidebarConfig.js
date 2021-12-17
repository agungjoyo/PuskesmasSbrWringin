import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
// import lockFill from "@iconify/icons-eva/lock-fill";
// import personAddFill from "@iconify/icons-eva/person-add-fill";
import chartLineData from "@iconify/icons-carbon/chart-line-data";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    key: "1",
    title: "Dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    key: "2",
    title: "User",
    path: "/dashboard/user",
    icon: getIcon(peopleFill),
  },
  {
    key: "3",
    title: "DataCoc",
    path: "/dashboard/data-coc",
    icon: getIcon(chartLineData),
  },
  {
    key: "4",
    title: "DataImunisasi",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },
  {
    key: "5",
    title: "DataGizi",
    path: "/dashboard/blog",
    icon: getIcon(fileTextFill),
  },
  {
    key: "6",
    title: "Graphic KIA",
    path: "/dashboard/graphic/kia",
    icon: getIcon(chartLineData),
  },
  {
    key: "7",
    title: "Graphic Imunisasi",
    path: "/dashboard/graphic/imunisasi",
    icon: getIcon(chartLineData),
  },
  {
    key: "8",
    title: "Graphic Gizi",
    path: "/dashboard/app",
    icon: getIcon(chartLineData),
  },
];

export default sidebarConfig;
