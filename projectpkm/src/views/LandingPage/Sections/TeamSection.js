import React from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// nodejs library that concatenates classes
import { Card, CardHeader, Box } from "@mui/material";
// @material-ui/core components
import { styled } from "@mui/material/styles";

// @material-ui/icons

// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";

// import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import { BaseOptionChartShowOnly } from "views/DashboardKIA/components/charts";

// import team1 from "assets/img/faces/avatar.jpg";
// import team2 from "assets/img/faces/christian.jpg";
// import team3 from "assets/img/faces/kendall.jpg";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "3px 3px 10px #9E9E9E",
  padding: theme.spacing(5, 0),
}));

const CHART_DATA = [
  {
    name: "Target",
    type: "column",
    data: [23, 72, 22, 27],
  },
  {
    name: "KIA",
    type: "column",
    data: [44, 55, 41, 67],
  },
  {
    name: "Paripurna",
    type: "column",
    data: [30, 25, 36, 30],
  },
];

export default function TeamSection() {
  const chartOptions = merge(BaseOptionChartShowOnly(), {
    stroke: { width: [3, 3, 3] },
    plotOptions: { bar: { columnWidth: "20%", borderRadius: 8 } },
    fill: {
      type: ["solid", "solid", "solid"],
    },
    labels: ["January 2021", "April 2021", "July 2021", "Octobor 2021"],
    xaxis: {
      type: "category",
      labels: {
        format: "MM yyyy",
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 50,
        bottom: 0,
        left: 35,
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });
  return (
    <div id="grafik">
      <RootStyle>
        <Card>
          <CardHeader title="Progress KIA" subheader="(+43%) than last year" />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart
              type="line"
              series={CHART_DATA}
              options={chartOptions}
              height={300}
            />
          </Box>
        </Card>
      </RootStyle>
    </div>
  );
}
