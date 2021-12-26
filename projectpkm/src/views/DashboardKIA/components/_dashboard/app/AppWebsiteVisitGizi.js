import React, { Component } from "react";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Box, Button, Grid } from "@mui/material";
import { withTheme } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
//
// import { BaseOptionChart } from "../../charts";
// database
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "3px 3px 10px #9E9E9E",
  padding: theme.spacing(0, 0, 2, 0),
  background:
    "linear-gradient(to bottom, #b0d0ff, #bbdbff, #c8e5ff, #d8eeff, #eaf7ff);",
}));

class AppWebsiteVisitGizi extends Component {
  state = {
    monthIndex: [],
    quarterIndex: [],
    showBulanGraphic: false,
    showTahunGraphic: false,
    showChoiceGraphic: false,
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
    yearIndex: "",
    year: [],
    desaIndex: [],
    desa: [],
    options: {
      stroke: { width: [3, 3, 3, 3] },
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
        enabled: true,
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
        name: "Jumlah Balita KMS (K)",
        type: "column",
        data: [],
      },
      {
        name: "Jumlah Baduta 0-23 Bln (D)",
        type: "column",
        data: [],
      },
      {
        name: "Jumlah Balita 23-59 Bln (D)",
        type: "column",
        data: [],
      },
      {
        name: "Jumlah Balita 0-59 Bln (D)",
        type: "column",
        data: [],
      },
      {
        name: "Jumlah Balita Naik BB (N)",
        type: "column",
        data: [],
      },
    ],
  };
  getStyles(month, monthIndex, theme) {
    return {
      fontWeight:
        monthIndex?.indexOf(month) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  getStylesDesa(desa, desaIndex, theme) {
    return {
      fontWeight:
        desaIndex?.indexOf(desa) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  getStylesTahun(year, yearIndex, theme) {
    return {
      fontWeight:
        yearIndex?.indexOf(year) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  handleChangeBulan = () => {
    const { data } = this.props;
    const desaTemp = [];
    for (let i = 0; i < data.length; i++) {
      desaTemp.push(data[i].Puskesmas);
    }
    const desa = Array.from(new Set(desaTemp));
    console.log(this.state);
    this.setState(
      {
        monthIndex: [],
        yearIndex: "",
        desa: desa,
        series: [
          {
            name: "Jumlah Balita KMS (K)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Baduta 0-23 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita 23-59 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita 0-59 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita Naik BB (N)",
            type: "column",
            data: [],
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: [],
          },
        },
        showBulanGraphic: !this.state.showBulanGraphic,
        showTahunGraphic: false,
        showChoiceGraphic: false,
      },
      () => {
        const yearList = [];
        const yearTemp = _.chain(data)
          .groupBy("Tahun")
          .map((set, Tahun) => ({ set, Tahun }))
          .value();
        for (let a = 0; a < yearTemp.length; a++) {
          yearList.push(yearTemp[a].Tahun);
        }
        this.setState({ year: yearList });
      }
    );
  };
  handleGraphicTahunControl = (event) => {
    this.setState(
      {
        yearIndex: event.target.value,
      },
      () => {
        const { data } = this.props;
        const dataFinal = _.chain(data)
          .groupBy("Puskesmas")
          .map((set, Puskesmas) => ({ set, Puskesmas }))
          .value();
        const desaTemp = [];
        for (let i = 0; i < data.length; i++) {
          desaTemp.push(data[i].Puskesmas);
        }
        const desa = Array.from(new Set(desaTemp));
        const series = [];
        const series2 = [];
        const series3 = [];
        const series4 = [];
        const series5 = [];
        const category = [];
        for (let a = 0; a < dataFinal.length; a++) {
          var JumlahBadutaLess23BlnYear = 0;
          var JmlBalitaLess2359BlnYear = 0;
          var JmlBalitaLess59BlnYear = 0;
          var JmlBalitaNaikBBYear = 0;
          var JumlahBalitaKMSYear = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              if (
                this.state.yearIndex.toLowerCase() ===
                dataFinal[a].set[i].Tahun.toString()
              ) {
                JumlahBadutaLess23BlnYear =
                  JumlahBadutaLess23BlnYear +
                  dataFinal[a].set[i].JumlahBadutaLess23Bln;
                JmlBalitaLess2359BlnYear =
                  JmlBalitaLess2359BlnYear +
                  dataFinal[a].set[i].JmlBalitaLess2359Bln;
                JmlBalitaLess59BlnYear =
                  JmlBalitaLess59BlnYear +
                  dataFinal[a].set[i].JmlBalitaLess59Bln;
                JmlBalitaNaikBBYear =
                  JmlBalitaNaikBBYear + dataFinal[a].set[i].JmlBalitaNaikBB;
                JumlahBalitaKMSYear =
                  JumlahBalitaKMSYear + dataFinal[a].set[i].JumlahBalitaKMS;
              }
            }
            series.push(JumlahBalitaKMSYear);
            series2.push(JumlahBadutaLess23BlnYear);
            series3.push(JmlBalitaLess2359BlnYear);
            series4.push(JmlBalitaLess59BlnYear);
            series5.push(JmlBalitaNaikBBYear);
            category.push(dataFinal[a].Puskesmas);
          }
        }
        this.setState({
          series: [
            {
              name: "Jumlah Balita KMS (K)",
              type: "column",
              data: series,
            },
            {
              name: "Jumlah Baduta 0-23 Bln (D)",
              type: "column",
              data: series2,
            },
            {
              name: "Jumlah Balita 23-59 Bln (D)",
              type: "column",
              data: series3,
            },
            {
              name: "Jumlah Balita 0-59 Bln (D)",
              type: "column",
              data: series4,
            },
            {
              name: "Jumlah Balita Naik BB (N)",
              type: "column",
              data: series5,
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
  handleChangeTahun = () => {
    this.setState(
      {
        series: [
          {
            name: "Jumlah Balita KMS (K)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Baduta 0-23 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita 23-59 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita 0-59 Bln (D)",
            type: "column",
            data: [],
          },
          {
            name: "Jumlah Balita Naik BB (N)",
            type: "column",
            data: [],
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: [],
          },
        },
        showTahunGraphic: !this.state.showTahunGraphic,
        showBulanGraphic: false,
        showChoiceGraphic: false,
      },
      () => {
        const year = new Date().getFullYear();
        const yearList = [];
        for (let i = 0; i < 5; i++) {
          yearList.push("" + (year + i));
        }
        this.setState({ year: yearList });
      }
    );
  };
  bulanGraphic = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
      <div>
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={300}
          />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
          <Select
            value={this.state.monthIndex}
            name="monthIndex"
            onChange={this.handleChange}
            label="Month"
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {this.state.month.map((month) => (
              <MenuItem
                key={month}
                value={month}
                style={this.getStyles(
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
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="yearIndex"
            value={this.state.yearIndex}
            onChange={this.handleChange}
            label="Year"
            //=========================================================
          >
            {this.state.year.map((year) => (
              <MenuItem
                key={year}
                value={year}
                style={this.getStylesTahun(
                  this.state.year,
                  this.state.yearIndex,
                  this.props.theme
                )}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Desa</InputLabel>
          <Select
            onChange={this.handleChange}
            name="desaIndex"
            label="Desa"
            value={this.state.desaIndex}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {this.state.desa.map((desa) => (
              <MenuItem
                key={desa}
                value={desa}
                style={this.getStylesDesa(
                  this.state.desa,
                  this.state.desaIndex,
                  this.props.theme
                )}
              >
                {desa}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };
  tahunGraphic = () => {
    return (
      <div>
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={300}
          />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.yearIndex}
            onChange={this.handleGraphicTahunControl}
            label="Year"
          >
            {this.state.year.map((year) => (
              <MenuItem
                key={year}
                value={year}
                style={this.getStylesTahun(
                  this.state.year,
                  this.state.yearIndex,
                  this.props.theme
                )}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };
  handleChange = (event) => {
    const { data } = this.props;
    const dataFinal = _.chain(data)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
    console.log(dataFinal);
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const series1 = [];
        const series2 = [];
        const series3 = [];
        const series4 = [];
        const series5 = [];
        let category = [];
        let JumlahBadutaLess23BlnBulan = 0;
        let JmlBalitaLess2359BlnBulan = 0;
        let JmlBalitaLess59BlnBulan = 0;
        let JmlBalitaNaikBBBulan = 0;
        let JumlahBalitaKMSBulan = 0;
        for (let a = 0; a < dataFinal.length; a++) {
          JumlahBadutaLess23BlnBulan = 0;
          JmlBalitaLess2359BlnBulan = 0;
          JmlBalitaLess59BlnBulan = 0;
          JmlBalitaNaikBBBulan = 0;
          JumlahBalitaKMSBulan = 0;
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
              for (let i = 0; i < dataFinal[i].set.length; i++) {
                for (let c = 0; c < this.state.monthIndex.length; c++) {
                  if (
                    this.state.monthIndex[c]?.toLowerCase() ===
                      dataFinal[a].set[i].Bulan.toLowerCase() &&
                    this.state.yearIndex ===
                      dataFinal[a].set[i].Tahun.toString()
                  ) {
                    JumlahBalitaKMSBulan =
                      JumlahBalitaKMSBulan +
                      dataFinal[a].set[i].JumlahBalitaKMS;
                    JumlahBadutaLess23BlnBulan =
                      JumlahBadutaLess23BlnBulan +
                      dataFinal[a].set[c].JumlahBadutaLess23Bln;
                    JmlBalitaLess2359BlnBulan =
                      JmlBalitaLess2359BlnBulan +
                      dataFinal[a].set[c].JmlBalitaLess2359Bln;
                    JmlBalitaLess59BlnBulan =
                      JmlBalitaLess59BlnBulan +
                      dataFinal[a].set[c].JmlBalitaLess59Bln;
                    JmlBalitaNaikBBBulan =
                      JmlBalitaNaikBBBulan +
                      dataFinal[a].set[c].JmlBalitaNaikBB;
                  }
                }
              }
              series1.push(JumlahBalitaKMSBulan);
              series2.push(JumlahBadutaLess23BlnBulan);
              series3.push(JmlBalitaLess2359BlnBulan);
              series4.push(JmlBalitaLess59BlnBulan);
              series5.push(JmlBalitaNaikBBBulan);
              category.push(dataFinal[a].Puskesmas);
            }
          }
        }
        this.setState({
          series: [
            {
              name: "Jumlah Balita KMS (K)",
              type: "column",
              data: series1,
            },
            {
              name: "Jumlah Baduta 0-23 Bln (D)",
              type: "column",
              data: series2,
            },
            {
              name: "Jumlah Balita 23-59 Bln (D)",
              type: "column",
              data: series3,
            },
            {
              name: "Jumlah Balita 0-59 Bln (D)",
              type: "column",
              data: series4,
            },
            {
              name: "Jumlah Balita Naik BB (N)",
              type: "column",
              data: series5,
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
    const { data } = this.props;
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <RootStyle>
          <CardHeader
            title="Gizi"
            sx={{ typography: "caption" }}
            style={{
              marginBottom: 20,
              textAlign: "center",
              color: "black",
              paddingTop: 5,
              height: 50,
            }}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                variant="outlined"
                onClick={this.handleChangeBulan}
                style={{ justifyContent: "center" }}
                sx={{ width: 1, ml: 2 }}
              >
                Grafik Bulan
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={this.handleChangeTahun}
                style={{ justifyContent: "center" }}
                sx={{ width: 1, mr: 2 }}
              >
                Grafik Tahun
              </Button>
            </Grid>
          </Grid>
          {this.state.showBulanGraphic ? <this.bulanGraphic /> : null}
          {this.state.showTahunGraphic ? <this.tahunGraphic /> : null}
        </RootStyle>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.firestore.ordered.Gizi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Gizi" }]),
  connect(mapStateToProps),
  withTheme
)(AppWebsiteVisitGizi);
