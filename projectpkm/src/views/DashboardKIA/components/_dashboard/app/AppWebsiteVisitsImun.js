import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Box } from "@mui/material";
import { withTheme } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// database
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "3px 3px 10px #9E9E9E",
  padding: theme.spacing(0, 0),
}));

class AppWebsiteVisitsImun extends Component {
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
        type: [
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
        ],
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
        name: "Sasaran BBL",
        type: "column",
        data: [],
      },
      {
        name: "Sasaran SI",
        type: "column",
        data: [],
      },
      {
        name: "HBO < 24 Jam Bulan Lalu",
        type: "column",
        data: [],
      },
      {
        name: "HBO < 24 Jam Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "HBO 0-7 hari Bulan lalu",
        type: "column",
        data: [],
      },
      {
        name: "HBO 0-7 hari Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "BCG Bulan Lalu",
        type: "column",
        data: [],
      },
      {
        name: "BCG Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "BCG Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "BCG Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-1 Bulan Lalu",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-1 Bulan Ini",
        type: "column",
        data: [],
      },
    ],
  };

  handleChange = (event) => {
    const { data } = this.props;
    const series1 = [];
    const series2 = [];
    const series3 = [];
    const series4 = [];
    const series5 = [];
    const series6 = [];
    const series7 = [];
    const series8 = [];
    const series9 = [];
    const series10 = [];
    const category = [];
    console.log(series1);
    console.log(series2);
    console.log(series3);
    console.log(series4);
    console.log(series5);
    console.log(series6);
    console.log(series7);
    console.log(series8);
    console.log(series9);
    console.log(series10);
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
              data[i].SasaranBayiBarulahir,
              data[i].SasaranSurvivingInfant,
              data[i].HBOLessOneDLM,
              data[i].HBOLessOneDTM,
              data[i].HBOLessOneWLM,
              data[i].HBOLessOneWTM,
              data[i].BCGLastMonth,
              data[i].BCGThisMonth,
              data[i].DPTHB1LastMonth,
              data[i].DPTHB1ThisMonth
            );
            series1.push(data[i].SasaranBayiBarulahir);
            series2.push(data[i].SasaranSurvivingInfant);
            series3.push(data[i].HBOLessOneDLM);
            series4.push(data[i].HBOLessOneDTM);
            series5.push(data[i].HBOLessOneWLM);
            series6.push(data[i].HBOLessOneWTM);
            series7.push(data[i].BCGLastMonth);
            series8.push(data[i].BCGThisMonth);
            series9.push(data[i].DPTHB1LastMonth);
            series10.push(data[i].DPTHB1ThisMonth);
            category.push(data[i].Puskesmas);
          }
        }
        this.setState({
          series: [
            {
              name: "Sasaran BBL",
              type: "column",
              data: series1,
            },
            {
              name: "Sasaran SI",
              type: "column",
              data: series2,
            },
            {
              name: "HBO < 24 Jam",
              type: "column",
              data: series3,
            },
            {
              name: "HBO < 24 Jam",
              type: "column",
              data: series4,
            },
            {
              name: "HBO 0-7 hari",
              type: "column",
              data: series5,
            },
            {
              name: "HBO 0-7 hari",
              type: "column",
              data: series6,
            },
            {
              name: "BCG",
              type: "column",
              data: series7,
            },
            {
              name: "BCG",
              type: "column",
              data: series8,
            },
            {
              name: "DPTHB1",
              type: "column",
              data: series9,
            },
            {
              name: "DPTHB1",
              type: "column",
              data: series10,
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
    function getStyles(month, monthIndex, theme) {
      return {
        fontWeight:
          monthIndex?.indexOf(month) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    //===============================================================================================================================
    const { data } = this.props;
    console.log(this.state, data);
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <RootStyle>
          <Card>
            <CardHeader title="Program Imunisasi" />
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
    data: state.firestore.ordered.Imunisasi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Imunisasi" }]),
  connect(mapStateToProps),
  withTheme
)(AppWebsiteVisitsImun);
