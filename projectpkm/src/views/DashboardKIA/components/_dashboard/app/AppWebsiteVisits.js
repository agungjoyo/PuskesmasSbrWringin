import React, { Component } from "react";
// import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Box } from "@mui/material";
import { withTheme } from "@material-ui/core/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";
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
    monthIndex: "",
    month: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
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
            delay: 1000,
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
  // componentDidUpdate() {
  //   const { data } = this.props;
  //   if (data !== undefined) {
  //     for (var i = 0; i < data.length; i++) {
  //       if (
  //         this.state.monthIndex.toLowerCase() === data[i].Bulan.toLowerCase()
  //       ) {
  //         console.log(
  //           this.state.monthIndex.toLowerCase(),
  //           data[i].Bulan.toLowerCase(),
  //           data[i].SasaranBayiTL,
  //           data[i].PencapaianLahirHidupTL,
  //           data[i].PencapaianLahirMatiTL
  //         );
  //         this.state.series[0].data.push(data[i].SasaranBayiTL);
  //         this.state.series[1].data.push(data[i].PencapaianLahirHidupTL);
  //         this.state.series[2].data.push(data[i].PencapaianLahirMatiTL);
  //         this.state.options.xaxis.categories.push(data[i].Puskesmas);
  //       }
  //     }
  //   }
  // }
  // componentDidMount() {
  //   const { data } = this.props;
  //   if (data !== undefined) {
  //     for (var i = 0; i < data.length; i++) {
  //       if (
  //         this.state.monthIndex.toLowerCase() === data[i].Bulan.toLowerCase()
  //       ) {
  //         console.log(
  //           this.state.monthIndex.toLowerCase(),
  //           data[i].Bulan.toLowerCase(),
  //           data[i].SasaranBayiTL,
  //           data[i].PencapaianLahirHidupTL,
  //           data[i].PencapaianLahirMatiTL
  //         );
  //         this.state.series[0].data.push(data[i].SasaranBayiTL);
  //         this.state.series[1].data.push(data[i].PencapaianLahirHidupTL);
  //         this.state.series[2].data.push(data[i].PencapaianLahirMatiTL);
  //         this.state.options.xaxis.categories.push(data[i].Puskesmas);
  //       }
  //     }
  //   }
  // }
  handleChange = (event) => {
    const { data } = this.props;
    const series1 = [];
    const series2 = [];
    const series3 = [];
    const category = [];
    console.log(series1);
    console.log(series2);
    console.log(series3);
    console.log(category);
    this.setState(
      {
        monthIndex: event.target.value,
      },
      () => {
        for (var i = 0; i < data.length; i++) {
          if (
            this.state.monthIndex.toLowerCase() === data[i].Bulan.toLowerCase()
          ) {
            console.log(
              data,
              this.state.monthIndex.toLowerCase(),
              data[i].Bulan.toLowerCase(),
              data[i].SasaranBayiTL,
              data[i].PencapaianLahirHidupTL,
              data[i].PencapaianLahirMatiTL
            );
            series1.push(data[i].SasaranBayiTL);
            series2.push(data[i].PencapaianLahirHidupTL);
            series3.push(data[i].PencapaianLahirMatiTL);
            category.push(data[i].Puskesmas);
          }
        }
        this.setState({
          series: [
            {
              name: "Sasaran",
              type: "column",
              data: series1,
            },
            {
              name: "Lahir Hidup",
              type: "column",
              data: series2,
            },
            {
              name: "Lahir Mati",
              type: "column",
              data: series3,
            },
          ],
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: category,
            },
          },
        });
      }
    );
  };
  render() {
    // const ITEM_HEIGHT = 48;
    // const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //   PaperProps: {
    //     style: {
    //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //       width: 250,
    //     },
    //   },
    // };
    function getStyles(month, monthIndex, theme) {
      return {
        fontWeight:
          monthIndex?.indexOf(month) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    //================================================For Multiple =================================================================
    // const handleChange = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   this.setState({
    //     monthIndex: typeof value === "string" ? value.split(",") : value,
    //   });
    // };
    //===============================================================================================================================
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
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            {/* <InputLabel id="demo-multiple-chip-label">Month</InputLabel> */}
            <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.monthIndex}
              onChange={this.handleChange}
              label="Month"
              //========================Multiple========================
              // labelId="demo-multiple-chip-label"
              // id="demo-multiple-chip"
              // multiple
              // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              // renderValue={(selected) => (
              //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              //     {selected.map((value) => (
              //       <Chip key={value} label={value} />
              //     ))}
              //   </Box>
              // )}
              // MenuProps={MenuProps}
              //=========================================================
            >
              {this.state.month.map((month) => (
                <MenuItem
                  key={month}
                  value={month}
                  style={getStyles(
                    this.state.month,
                    this.state.monthIndex,
                    this.props.theme
                  )}
                >
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
  connect(mapStateToProps),
  withTheme
)(AppWebsiteVisits);
