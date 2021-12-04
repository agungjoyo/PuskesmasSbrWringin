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
      chart: {
        id: "basic-bar",
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 2,
          left: 3,
          blur: 2,
          color: "#9E9E9E",
          opacity: 0.55,
        },
        toolbar: { show: true, offsetY: -25, offsetX: -5 },
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 2000,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: { bar: { columnWidth: "45%", borderRadius: 8 } },
      fill: {
        type: ["solid", "solid", "solid"],
      },
      dataLabels: {
        enabled: false,
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
      xaxis: {
        type: "category",
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
  componentDidUpdate() {
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
        this.state.options.xaxis.categories.push(data[i].Puskesmas);
      }
    }
  }
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
        this.state.options.xaxis.categories.push(data[i].Puskesmas);
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
                type="bar"
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
