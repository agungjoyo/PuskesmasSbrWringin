import React, { Component } from "react";
// import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Box } from "@mui/material";
//
// import { BaseOptionChart } from "../../charts";
// database
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "3px 3px 10px #9E9E9E",
  padding: theme.spacing(0, 0),
}));

// const CHART_DATA = [
//   {
//     name: "Target",
//     type: "column",
//     data: [23, 72, 22, 27, 53, 27],
//   },
//   {
//     name: "KIA",
//     type: "column",
//     data: [44, 52, 40, 67, 90, 21],
//   },
//   {
//     name: "Paripurna",
//     type: "column",
//     data: [30, 25, 36, 30, 15, 21],
//   },
// ];

class AppWebsiteVisits extends Component {
  state = {
    options: {
      stroke: { width: [3, 3, 3] },
      plotOptions: { bar: { columnWidth: "45%", borderRadius: 8 } },
      fill: {
        type: ["solid", "solid", "solid"],
      },
      chart: {
        id: "basic-bar",
      },
      labels: [
        "Tegaljati",
        "RejoAgung",
        "SukoRejo",
        "Sukosari Kidul",
        "Sumber Gading",
        "Sumber Wringin",
      ],
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 50,
          bottom: 0,
          left: 35,
        },
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Sasaran",
        type: "column",
        data: [],
      },
      {
        name: "Lahir Hidup",
        type: "column",
        data: [],
      },
      {
        name: "Lahir Mati",
        type: "column",
        data: [],
      },
    ],
  };
  componentDidMount() {
    const { data } = this.props;
    if (data !== undefined) {
      for (var i = 0; i < data.length; i++) {
        console.log(
          data[i].SasaranBayiTL,
          data[i].PencapaianLahirHidupTL,
          data[i].PencapaianLahirMatiTL
        );
        this.state.series[0].data.push(data[i].SasaranBayiTL);
        this.state.series[1].data.push(data[i].PencapaianLahirHidupTL);
        this.state.series[2].data.push(data[i].PencapaianLahirMatiTL);
      }
    }
  }
  render() {
    const { data } = this.props;
    console.log(this.state, data);
    // const getPuskesmas = () => {
    //   for (var i = 0; i < data.length; i++) {
    //     console.log(data[i].Puskesmas, i);
    //     this.setState({ Puskesmas: data[i].Puskesmas });
    //   }
    // };
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      // const chartOptions = merge(BaseOptionChart, {
      //   stroke: { width: [3, 3, 3] },
      //   plotOptions: { bar: { columnWidth: "20%", borderRadius: 8 } },
      //   fill: {
      //     type: ["solid", "solid", "solid"],
      //   },
      // labels: [this.state.puskesmas[0]],
      // xaxis: {
      //   type: "category",
      //   labels: {
      //     format: "MM yyyy",
      //   },
      // },
      //   grid: {
      //     show: false,
      //     padding: {
      //       top: 0,
      //       right: 50,
      //       bottom: 0,
      //       left: 35,
      //     },
      //   },
      //   tooltip: {
      //     shared: false,
      //     intersect: false,
      //     y: {
      //       formatter: (y) => {
      //         if (typeof y !== "undefined") {
      //           return `${y.toFixed(0)} visits`;
      //         }
      //         return y;
      //       },
      //     },
      //   },
      // });

      return (
        <RootStyle>
          <Card>
            <CardHeader
              title="Progress KIA"
              subheader="(+43%) than last year"
            />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
              <ReactApexChart
                type="line"
                series={this.state.series}
                options={this.state.options}
                height={300}
              />
            </Box>
          </Card>
        </RootStyle>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.firestore.ordered.KIA, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "KIA" }]),
  connect(mapStateToProps)
)(AppWebsiteVisits);
