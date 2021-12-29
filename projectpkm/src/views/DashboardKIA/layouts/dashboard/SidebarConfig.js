import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
//mport shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
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
    title: "Data Coc",
    path: "/dashboard/data-coc/kia",
    icon: getIcon(fileTextFill),
  },
  {
    key: "4",
    title: "Data Imunisasi",
    path: "/dashboard/data-coc/imun",
    icon: getIcon(fileTextFill),
  },
  {
    key: "5",
    title: "Data Gizi",
    path: "/dashboard/data-coc/gizi",
    icon: getIcon(fileTextFill),
  },
  {
    key: "6",
    title: "Data Gizi COC",
    path: "/dashboard/DataCOCGizi",
    icon: getIcon(fileTextFill),
  },
  {
    key: "7",
    title: "Graphic COC",
    path: "/dashboard/graphic/coc",
    icon: getIcon(chartLineData),
  },
  {
    key: "8",
    title: "Graphic KIA",
    path: "/dashboard/graphic/kia",
    icon: getIcon(chartLineData),
  },
  {
    key: "9",
    title: "Graphic Imunisasi",
    path: "/dashboard/graphic/imunisasi",
    icon: getIcon(chartLineData),
  },
  {
    key: "10",
    title: "Graphic Gizi",
    path: "/dashboard/graphic/gizi",
    icon: getIcon(chartLineData),
  },
];

export default sidebarConfig;
