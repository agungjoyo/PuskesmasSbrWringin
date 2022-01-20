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

class GraphicCocPKMImun extends Component {
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
    ChangeIndex: "",
    Change: ["Number", "Persentase"],
    desaIndex: [],
    desa: [],
    options: {
      stroke: { width: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
      chart: {
        type: "bar",
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
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "95%",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#e8b0d5",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
      ],
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
          "solid",
          "solid",
          "solid",
          "solid",
          "solid",
        ],
      },
      dataLabels: {
        enabled: true,
        offsetY: 0,
        offsetX: 0,
        dropShadow: {
          enabled: true,
          top: 2,
          left: 3,
          blur: 2,
          color: "#9E9E9E",
          opacity: 0.55,
        },
        style: {
          fontSize: "12px",
          colors: [
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
          ],
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
        name: "HBO < 24 Jam ",
        type: "column",
        data: [],
      },

      {
        name: "HBO 0-7 hari ",
        type: "column",
        data: [],
      },
      {
        name: "BCG ",
        type: "column",
        data: [],
      },
      {
        name: "BCG ",
        type: "column",
        data: [],
      },
      {
        name: "Polio-1 ",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-1 ",
        type: "column",
        data: [],
      },
      {
        name: "Polio-2 ",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-2 ",
        type: "column",
        data: [],
      },
      {
        name: "Polio-3 ",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-3 ",
        type: "column",
        data: [],
      },
      {
        name: "Polio-4 ",
        type: "column",
        data: [],
      },
      {
        name: "IPV ",
        type: "column",
        data: [],
      },
      {
        name: "Campak-Rubella ",
        type: "column",
        data: [],
      },
      {
        name: "IDL ",
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
  getStylesChange(Change, ChangeIndex, theme) {
    return {
      fontWeight:
        ChangeIndex?.indexOf(Change) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  handleChangeBulan = () => {
    const { data } = this.props;
    const desaTemp = ["PUSKESMAS SUMBER WRINGIN"];
    for (let i = 0; i < data.length; i++) {
      desaTemp.push(data[i].Puskesmas);
    }
    const desa = Array.from(new Set(desaTemp));
    this.setState(
      {
        monthIndex: [],
        desaIndex: [],
        yearIndex: "",
        desa: desa,
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
            name: "HBO < 24 Jam ",
            type: "column",
            data: [],
          },

          {
            name: "HBO 0-7 hari ",
            type: "column",
            data: [],
          },
          {
            name: "BCG ",
            type: "column",
            data: [],
          },
          {
            name: "BCG ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-1 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-1 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-2 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-2 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-3 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-3 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-4 ",
            type: "column",
            data: [],
          },
          {
            name: "IPV ",
            type: "column",
            data: [],
          },
          {
            name: "Campak-Rubella ",
            type: "column",
            data: [],
          },
          {
            name: "IDL ",
            type: "column",
            data: [],
          },
        ],
        options: {
          ...this.state.options,
          dataLabels: {
            ...this.state.options.dataLabels,
            offsetY: -20,
            offsetX: 0,
          },
          plotOptions: {
            ...this.state.options.plotOptions,
            bar: {
              ...this.state.options.plotOptions.bar,
              horizontal: false,
            },
          },
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
  handleChangeTahun = () => {
    const { data } = this.props;
    const yearList = [];
    const yearTemp = _.chain(data)
      .groupBy("Tahun")
      .map((set, Tahun) => ({ set, Tahun }))
      .value();
    for (let a = 0; a < yearTemp.length; a++) {
      yearList.push(yearTemp[a].Tahun);
    }
    const desaTemp = [];
    for (let i = 0; i < data.length; i++) {
      desaTemp.push(data[i].Puskesmas);
    }
    desaTemp.push("PUSKESMAS SUMBER WRINGIN");
    const desa = Array.from(new Set(desaTemp));
    this.setState(
      {
        yearIndex: "",
        year: yearList,
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
            name: "HBO < 24 Jam ",
            type: "column",
            data: [],
          },

          {
            name: "HBO 0-7 hari ",
            type: "column",
            data: [],
          },
          {
            name: "BCG ",
            type: "column",
            data: [],
          },
          {
            name: "BCG ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-1 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-1 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-2 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-2 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-3 ",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-3 ",
            type: "column",
            data: [],
          },
          {
            name: "Polio-4 ",
            type: "column",
            data: [],
          },
          {
            name: "IPV ",
            type: "column",
            data: [],
          },
          {
            name: "Campak-Rubella ",
            type: "column",
            data: [],
          },
          {
            name: "IDL ",
            type: "column",
            data: [],
          },
        ],
        options: {
          ...this.state.options,
          dataLabels: {
            ...this.state.options.dataLabels,
            offsetY: 0,
            offsetX: 0,
          },
          plotOptions: {
            ...this.state.options.plotOptions,
            bar: {
              ...this.state.options.plotOptions.bar,
              horizontal: true,
            },
          },
          xaxis: {
            ...this.state.options.xaxis,
            categories: desa,
          },
        },
        showTahunGraphic: !this.state.showTahunGraphic,
        showBulanGraphic: false,
        showChoiceGraphic: false,
      },
      () => {
        console.log(this.state);
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
            value={this.state.desaIndex}
            onChange={this.handleChange}
            name="desaIndex"
            label="Desa"
            //========================Multiple========================
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
            //=========================================================
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
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Index</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.ChangeIndex}
            onChange={this.handleChange}
            label="ChangeIndex"
            name="ChangeIndex"
          >
            {this.state.Change.map((Change) => (
              <MenuItem
                key={Change}
                value={Change}
                style={this.getStylesChange(
                  this.state.Change,
                  this.state.ChangeIndex,
                  this.props.theme
                )}
              >
                {Change}
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
            height={1800}
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
        const series6 = [];
        const series7 = [];
        const series8 = [];
        const series9 = [];
        const series10 = [];
        const series11 = [];
        const series12 = [];
        const series13 = [];
        const series14 = [];
        const series15 = [];
        let category = [];
        let SasaranBayiBaruLahirBulan = 0;
        let SasaranSurvivingInfantBulan = 0;
        let HBOLessOneDTMBulan = 0;
        let HBOLessOneWTMBulan = 0;
        let BCGThisMonthBulan = 0;
        let CampakRubellaTMBulan = 0;
        let Polio1ThisMonthBulan = 0;
        let DPTHB1ThisMonthBulan = 0;
        let Polio2ThisMonthBulan = 0;
        let DPTHB2ThisMonthBulan = 0;
        let Polio3ThisMonthBulan = 0;
        let DPTHB3ThisMonthBulan = 0;
        let Polio4ThisMonthBulan = 0;
        let IPVThisMonthBulan = 0;
        let IDLThisMonthBulan = 0;
        if (this.state.desaIndex == "PUSKESMAS SUMBER WRINGIN") {
          this.setState(
            {
              desaIndex: ["PUSKESMAS SUMBER WRINGIN"],
            },
            () => {
              let FinalSeries1 = 0;
              let FinalSeries2 = 0;
              let FinalSeries3 = 0;
              let FinalSeries4 = 0;
              let FinalSeries5 = 0;
              let FinalSeries6 = 0;
              let FinalSeries7 = 0;
              let FinalSeries8 = 0;
              let FinalSeries9 = 0;
              let FinalSeries10 = 0;
              let FinalSeries11 = 0;
              let FinalSeries12 = 0;
              let FinalSeries13 = 0;
              let FinalSeries14 = 0;
              let FinalSeries15 = 0;
              this.setState(
                {
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
                      name: "HBO < 24 Jam ",
                      type: "column",
                      data: [],
                    },

                    {
                      name: "HBO 0-7 hari ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "BCG ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Polio-1 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "DPTHB-1 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Polio-2 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "DPTHB-2 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Polio-3 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "DPTHB-3 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Polio-4 ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "IPV ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Campak-Rubella ",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "IDL ",
                      type: "column",
                      data: [],
                    },
                  ],
                  options: {
                    ...this.state.options,
                    dataLabels: {
                      ...this.state.options.dataLabels,
                      offsetY: -20,
                      offsetX: 0,
                    },
                    plotOptions: {
                      ...this.state.options.plotOptions,
                      bar: {
                        ...this.state.options.plotOptions.bar,
                        horizontal: false,
                      },
                    },
                    xaxis: {
                      ...this.state.options.xaxis,
                      categories: [],
                    },
                  },
                },
                () => {
                  for (let a = 0; a < dataFinal.length; a++) {
                    SasaranBayiBaruLahirBulan = 0;
                    SasaranSurvivingInfantBulan = 0;
                    HBOLessOneDTMBulan = 0;
                    HBOLessOneDTMPersentase = 0;
                    HBOLessOneWTMBulan = 0;
                    HBOLessOneWTMPersentase = 0;
                    BCGThisMonthBulan = 0;
                    BCGPersentase = 0;
                    Polio1ThisMonthBulan = 0;
                    Polio1Persentase = 0;
                    DPTHB1ThisMonthBulan = 0;
                    DPTHB1Persentase = 0;
                    Polio2ThisMonthBulan = 0;
                    Polio2Persentase = 0;
                    DPTHB2ThisMonthBulan = 0;
                    DPTHB2Persentase = 0;
                    Polio3ThisMonthBulan = 0;
                    Polio3Persentase = 0;
                    DPTHB3ThisMonthBulan = 0;
                    DPTHB3Persentase = 0;
                    Polio4ThisMonthBulan = 0;
                    Polio4Persentase = 0;
                    IPVThisMonthBulan = 0;
                    IPVPersentase = 0;
                    CampakRubellaTMBulan = 0;
                    CampakPersentase = 0;
                    IDLThisMonthBulan = 0;
                    IDLPersentase = 0;

                    for (let b = 0; b < this.state.desa.length; b++) {
                      if (dataFinal[a].Puskesmas == this.state.desa[b]) {
                        for (let i = 0; i < dataFinal[i].set.length; i++) {
                          for (
                            let c = 0;
                            c < this.state.monthIndex.length;
                            c++
                          ) {
                            if (
                              this.state.monthIndex[c]?.toLowerCase() ===
                                dataFinal[a].set[i].Bulan.toLowerCase() &&
                              this.state.yearIndex === dataFinal[a].set[i].Tahun
                            ) {
                              SasaranBayiBaruLahirBulan =
                                SasaranBayiBaruLahirBulan +
                                dataFinal[a].set[i].SasaranBayiBaruLahir;
                              SasaranSurvivingInfantBulan =
                                SasaranSurvivingInfantBulan +
                                dataFinal[a].set[i].SasaranSurvivingInfant;
                              HBOLessOneDTMBulan =
                                HBOLessOneDTMBulan +
                                dataFinal[a].set[c].HBOLessOneDTM;
                              HBOLessOneWTMBulan =
                                HBOLessOneWTMBulan +
                                dataFinal[a].set[c].HBOLessOneWTM;
                              BCGThisMonthBulan =
                                BCGThisMonthBulan +
                                dataFinal[a].set[c].BCGThisMonth;
                              CampakRubellaTMBulan =
                                CampakRubellaTMBulan +
                                dataFinal[a].set[c].CampakRubellaTM;
                              Polio1ThisMonthBulan =
                                Polio1ThisMonthBulan +
                                dataFinal[a].set[c].Polio1ThisMonth;
                              DPTHB1ThisMonthBulan =
                                DPTHB1ThisMonthBulan +
                                dataFinal[a].set[c].DPTHB1ThisMonth;
                              Polio2ThisMonthBulan =
                                Polio2ThisMonthBulan +
                                dataFinal[a].set[c].Polio2ThisMonth;
                              DPTHB2ThisMonthBulan =
                                DPTHB2ThisMonthBulan +
                                dataFinal[a].set[c].DPTHB2ThisMonth;
                              Polio3ThisMonthBulan =
                                Polio3ThisMonthBulan +
                                dataFinal[a].set[c].Polio3ThisMonth;
                              DPTHB3ThisMonthBulan =
                                DPTHB3ThisMonthBulan +
                                dataFinal[a].set[c].DPTHB3ThisMonth;
                              Polio4ThisMonthBulan =
                                Polio4ThisMonthBulan +
                                dataFinal[a].set[c].Polio4ThisMonth;
                              IPVThisMonthBulan =
                                IPVThisMonthBulan +
                                dataFinal[a].set[c].IPVThisMonth;
                              IDLThisMonthBulan =
                                IDLThisMonthBulan +
                                dataFinal[a].set[c].IDLThisMonth;
                            }
                          }
                        }
                        series1.push(SasaranBayiBaruLahirBulan);
                        series2.push(SasaranSurvivingInfantBulan);
                        series3.push(HBOLessOneDTMBulan);
                        series4.push(HBOLessOneWTMBulan);
                        series5.push(BCGThisMonthBulan);
                        series6.push(CampakRubellaTMBulan);
                        series7.push(Polio1ThisMonthBulan);
                        series8.push(DPTHB1ThisMonthBulan);
                        series9.push(Polio2ThisMonthBulan);
                        series10.push(DPTHB2ThisMonthBulan);
                        series11.push(Polio3ThisMonthBulan);
                        series12.push(DPTHB3ThisMonthBulan);
                        series13.push(Polio4ThisMonthBulan);
                        series14.push(IPVThisMonthBulan);
                        series15.push(IDLThisMonthBulan);
                      }
                    }
                  }
                  for (let s1 = 0; s1 < series1.length; s1++) {
                    FinalSeries1 = FinalSeries1 + series1[s1];
                  }
                  for (let s2 = 0; s2 < series2.length; s2++) {
                    FinalSeries2 = FinalSeries2 + series2[s2];
                  }
                  for (let s3 = 0; s3 < series3.length; s3++) {
                    FinalSeries3 = FinalSeries3 + series3[s3];
                  }
                  for (let s4 = 0; s4 < series4.length; s4++) {
                    FinalSeries4 = FinalSeries4 + series4[s4];
                  }
                  for (let s5 = 0; s5 < series5.length; s5++) {
                    FinalSeries5 = FinalSeries5 + series5[s5];
                  }
                  for (let s6 = 0; s6 < series6.length; s6++) {
                    FinalSeries6 = FinalSeries6 + series6[s6];
                  }
                  for (let s7 = 0; s7 < series7.length; s7++) {
                    FinalSeries7 = FinalSeries7 + series7[s7];
                  }
                  for (let s8 = 0; s8 < series8.length; s8++) {
                    FinalSeries8 = FinalSeries8 + series8[s8];
                  }
                  for (let s9 = 0; s9 < series9.length; s9++) {
                    FinalSeries9 = FinalSeries9 + series9[s9];
                  }
                  for (let s10 = 0; s10 < series10.length; s10++) {
                    FinalSeries10 = FinalSeries10 + series10[s10];
                  }
                  for (let s11 = 0; s11 < series11.length; s11++) {
                    FinalSeries11 = FinalSeries11 + series11[s11];
                  }
                  for (let s12 = 0; s12 < series12.length; s12++) {
                    FinalSeries12 = FinalSeries12 + series12[s12];
                  }
                  for (let s13 = 0; s13 < series13.length; s13++) {
                    FinalSeries13 = FinalSeries13 + series13[s13];
                  }
                  for (let s14 = 0; s14 < series14.length; s14++) {
                    FinalSeries14 = FinalSeries14 + series14[s14];
                  }
                  for (let s15 = 0; s15 < series15.length; s15++) {
                    FinalSeries15 = FinalSeries15 + series15[s15];
                  }
                  if (this.state.ChangeIndex == "Persentase") {
                    this.setState({
                      series: [
                        {
                          name: "Sasaran BBL",
                          type: "column",
                          data: [FinalSeries1],
                        },
                        {
                          name: "Sasaran SI",
                          type: "column",
                          data: [FinalSeries2],
                        },
                        {
                          name: "HBO < 24 Jam ",
                          type: "column",
                          data: [FinalSeries3],
                        },

                        {
                          name: "HBO 0-7 hari ",
                          type: "column",
                          data: [FinalSeries4],
                        },
                        {
                          name: "BCG ",
                          type: "column",
                          data: [FinalSeries5],
                        },
                        {
                          name: "Polio-1 ",
                          type: "column",
                          data: [FinalSeries6],
                        },
                        {
                          name: "DPTHB-1 ",
                          type: "column",
                          data: [FinalSeries7],
                        },
                        {
                          name: "Polio-2 ",
                          type: "column",
                          data: [FinalSeries8],
                        },
                        {
                          name: "DPTHB-2 ",
                          type: "column",
                          data: [FinalSeries9],
                        },
                        {
                          name: "Polio-3 ",
                          type: "column",
                          data: [FinalSeries10],
                        },
                        {
                          name: "DPTHB-3 ",
                          type: "column",
                          data: [FinalSeries11],
                        },
                        {
                          name: "Polio-4 ",
                          type: "column",
                          data: [FinalSeries12],
                        },
                        {
                          name: "IPV ",
                          type: "column",
                          data: [FinalSeries13],
                        },
                        {
                          name: "Campak-Rubella ",
                          type: "column",
                          data: [FinalSeries14],
                        },
                        {
                          name: "IDL ",
                          type: "column",
                          data: [FinalSeries15],
                        },
                      ],
                      options: {
                        ...this.state.options,
                        dataLabels: {
                          ...this.state.options.dataLabels,
                          formatter: (value, data) => {
                            if (data.seriesIndex == 2) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[2].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 3) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[3].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 4) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[4].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 5) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[5].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 6) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[6].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 7) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[7].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 8) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[8].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 9) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[9].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 10) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[10].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 11) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[11].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 12) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[12].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 13) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[13].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else if (data.seriesIndex == 14) {
                              let percentage = 0;
                              percentage =
                                (
                                  (data.w.config.series[14].data[
                                    data.dataPointIndex
                                  ] /
                                    data.w.config.series[0].data[
                                      data.dataPointIndex
                                    ]) *
                                  100
                                ).toFixed(1) + " %";
                              return percentage;
                            } else {
                              return value;
                            }
                          },
                        },
                        xaxis: {
                          ...this.state.options.xaxis,
                          categories: ["PUSKESMAS SUMBER WRINGIN"],
                        },
                      },
                    });
                  } else {
                    this.setState({
                      series: [
                        {
                          name: "Sasaran BBL",
                          type: "column",
                          data: [FinalSeries1],
                        },
                        {
                          name: "Sasaran SI",
                          type: "column",
                          data: [FinalSeries2],
                        },
                        {
                          name: "HBO < 24 Jam ",
                          type: "column",
                          data: [FinalSeries3],
                        },

                        {
                          name: "HBO 0-7 hari ",
                          type: "column",
                          data: [FinalSeries4],
                        },
                        {
                          name: "BCG ",
                          type: "column",
                          data: [FinalSeries5],
                        },
                        {
                          name: "Polio-1 ",
                          type: "column",
                          data: [FinalSeries6],
                        },
                        {
                          name: "DPTHB-1 ",
                          type: "column",
                          data: [FinalSeries7],
                        },
                        {
                          name: "Polio-2 ",
                          type: "column",
                          data: [FinalSeries8],
                        },
                        {
                          name: "DPTHB-2 ",
                          type: "column",
                          data: [FinalSeries9],
                        },
                        {
                          name: "Polio-3 ",
                          type: "column",
                          data: [FinalSeries10],
                        },
                        {
                          name: "DPTHB-3 ",
                          type: "column",
                          data: [FinalSeries11],
                        },
                        {
                          name: "Polio-4 ",
                          type: "column",
                          data: [FinalSeries12],
                        },
                        {
                          name: "IPV ",
                          type: "column",
                          data: [FinalSeries13],
                        },
                        {
                          name: "Campak-Rubella ",
                          type: "column",
                          data: [FinalSeries14],
                        },
                        {
                          name: "IDL ",
                          type: "column",
                          data: [FinalSeries15],
                        },
                      ],
                      options: {
                        ...this.state.options,
                        dataLabels: {
                          ...this.state.options.dataLabels,
                          formatter: (value, data) => {
                            return value;
                          },
                        },
                        xaxis: {
                          ...this.state.options.xaxis,
                          categories: ["PUSKESMAS SUMBER WRINGIN"],
                        },
                      },
                    });
                  }
                }
              );
            }
          );
        } else {
          const deletePuskesmas = _.differenceWith(
            this.state.desaIndex,
            ["PUSKESMAS SUMBER WRINGIN"],
            _.isEqual
          );
          this.setState(
            {
              desaIndex: deletePuskesmas,
              options: {
                ...this.state.options,
                dataLabels: {
                  ...this.state.options.dataLabels,
                  offsetY: -20,
                  offsetX: 0,
                },
                plotOptions: {
                  ...this.state.options.plotOptions,
                  bar: {
                    ...this.state.options.plotOptions.bar,
                    horizontal: false,
                  },
                },
                xaxis: {
                  ...this.state.options.xaxis,
                  categories: [],
                },
              },
            },
            () => {
              for (let a = 0; a < dataFinal.length; a++) {
                SasaranBayiBaruLahirBulan = 0;
                SasaranSurvivingInfantBulan = 0;
                HBOLessOneDTMBulan = 0;
                HBOLessOneWTMBulan = 0;
                BCGThisMonthBulan = 0;
                CampakRubellaTMBulan = 0;
                Polio1ThisMonthBulan = 0;
                DPTHB1ThisMonthBulan = 0;
                Polio2ThisMonthBulan = 0;
                DPTHB2ThisMonthBulan = 0;
                Polio3ThisMonthBulan = 0;
                DPTHB3ThisMonthBulan = 0;
                Polio4ThisMonthBulan = 0;
                IPVThisMonthBulan = 0;
                IDLThisMonthBulan = 0;
                for (let b = 0; b < this.state.desaIndex.length; b++) {
                  if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
                    for (let i = 0; i < dataFinal[i].set.length; i++) {
                      for (let c = 0; c < this.state.monthIndex.length; c++) {
                        if (
                          this.state.monthIndex[c]?.toLowerCase() ===
                            dataFinal[a].set[i].Bulan.toLowerCase() &&
                          this.state.yearIndex === dataFinal[a].set[i].Tahun
                        ) {
                          SasaranBayiBaruLahirBulan =
                            SasaranBayiBaruLahirBulan +
                            dataFinal[a].set[i].SasaranBayiBaruLahir;
                          SasaranSurvivingInfantBulan =
                            SasaranSurvivingInfantBulan +
                            dataFinal[a].set[i].SasaranSurvivingInfant;
                          HBOLessOneDTMBulan =
                            HBOLessOneDTMBulan +
                            dataFinal[a].set[c].HBOLessOneDTM;
                          HBOLessOneWTMBulan =
                            HBOLessOneWTMBulan +
                            dataFinal[a].set[c].HBOLessOneWTM;
                          BCGThisMonthBulan =
                            BCGThisMonthBulan +
                            dataFinal[a].set[c].BCGThisMonth;
                          CampakRubellaTMBulan =
                            CampakRubellaTMBulan +
                            dataFinal[a].set[c].CampakRubellaTM;
                          Polio1ThisMonthBulan =
                            Polio1ThisMonthBulan +
                            dataFinal[a].set[c].Polio1ThisMonth;
                          DPTHB1ThisMonthBulan =
                            DPTHB1ThisMonthBulan +
                            dataFinal[a].set[c].DPTHB1ThisMonth;
                          Polio2ThisMonthBulan =
                            Polio2ThisMonthBulan +
                            dataFinal[a].set[c].Polio2ThisMonth;
                          DPTHB2ThisMonthBulan =
                            DPTHB2ThisMonthBulan +
                            dataFinal[a].set[c].DPTHB2ThisMonth;
                          Polio3ThisMonthBulan =
                            Polio3ThisMonthBulan +
                            dataFinal[a].set[c].Polio3ThisMonth;
                          DPTHB3ThisMonthBulan =
                            DPTHB3ThisMonthBulan +
                            dataFinal[a].set[c].DPTHB3ThisMonth;
                          Polio4ThisMonthBulan =
                            Polio4ThisMonthBulan +
                            dataFinal[a].set[c].Polio4ThisMonth;
                          IPVThisMonthBulan =
                            IPVThisMonthBulan +
                            dataFinal[a].set[c].IPVThisMonth;
                          IDLThisMonthBulan =
                            IDLThisMonthBulan +
                            dataFinal[a].set[c].IDLThisMonth;
                        }
                      }
                    }
                    series1.push(SasaranBayiBaruLahirBulan);
                    series2.push(SasaranSurvivingInfantBulan);
                    series3.push(HBOLessOneDTMBulan);
                    series4.push(HBOLessOneWTMBulan);
                    series5.push(BCGThisMonthBulan);
                    series6.push(CampakRubellaTMBulan);
                    series7.push(Polio1ThisMonthBulan);
                    series8.push(DPTHB1ThisMonthBulan);
                    series9.push(Polio2ThisMonthBulan);
                    series10.push(DPTHB2ThisMonthBulan);
                    series11.push(Polio3ThisMonthBulan);
                    series12.push(DPTHB3ThisMonthBulan);
                    series13.push(Polio4ThisMonthBulan);
                    series14.push(IPVThisMonthBulan);
                    series15.push(IDLThisMonthBulan);
                    category.push(dataFinal[a].Puskesmas);
                  }
                }
              }
              if (this.state.ChangeIndex == "Persentase") {
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
                      name: "HBO < 24 Jam ",
                      type: "column",
                      data: series3,
                    },

                    {
                      name: "HBO 0-7 hari ",
                      type: "column",
                      data: series4,
                    },
                    {
                      name: "BCG ",
                      type: "column",
                      data: series5,
                    },
                    {
                      name: "Polio-1 ",
                      type: "column",
                      data: series6,
                    },
                    {
                      name: "DPTHB-1 ",
                      type: "column",
                      data: series7,
                    },
                    {
                      name: "Polio-2 ",
                      type: "column",
                      data: series8,
                    },
                    {
                      name: "DPTHB-2 ",
                      type: "column",
                      data: series9,
                    },
                    {
                      name: "Polio-3 ",
                      type: "column",
                      data: series10,
                    },
                    {
                      name: "DPTHB-3 ",
                      type: "column",
                      data: series11,
                    },
                    {
                      name: "Polio-4 ",
                      type: "column",
                      data: series12,
                    },
                    {
                      name: "IPV ",
                      type: "column",
                      data: series13,
                    },
                    {
                      name: "Campak-Rubella ",
                      type: "column",
                      data: series14,
                    },
                    {
                      name: "IDL ",
                      type: "column",
                      data: series15,
                    },
                  ],
                  options: {
                    ...this.state.options,
                    dataLabels: {
                      ...this.state.options.dataLabels,
                      formatter: (value, data) => {
                        if (data.seriesIndex == 2) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[2].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 3) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[3].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 4) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[4].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 5) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[5].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 6) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[6].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 7) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[7].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 8) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[8].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 9) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[9].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 10) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[10].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 11) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[11].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 12) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[12].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 13) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[13].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 14) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[14].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 15) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[15].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else if (data.seriesIndex == 16) {
                          let percentage = 0;
                          percentage =
                            (
                              (data.w.config.series[16].data[
                                data.dataPointIndex
                              ] /
                                data.w.config.series[0].data[
                                  data.dataPointIndex
                                ]) *
                              100
                            ).toFixed(1) + " %";
                          return percentage;
                        } else {
                          return value;
                        }
                      },
                    },
                    xaxis: {
                      ...this.state.options.xaxis,
                      categories: category,
                    },
                  },
                });
              } else {
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
                      name: "HBO < 24 Jam ",
                      type: "column",
                      data: series3,
                    },

                    {
                      name: "HBO 0-7 hari ",
                      type: "column",
                      data: series4,
                    },
                    {
                      name: "BCG ",
                      type: "column",
                      data: series5,
                    },
                    {
                      name: "Polio-1 ",
                      type: "column",
                      data: series6,
                    },
                    {
                      name: "DPTHB-1 ",
                      type: "column",
                      data: series7,
                    },
                    {
                      name: "Polio-2 ",
                      type: "column",
                      data: series8,
                    },
                    {
                      name: "DPTHB-2 ",
                      type: "column",
                      data: series9,
                    },
                    {
                      name: "Polio-3 ",
                      type: "column",
                      data: series10,
                    },
                    {
                      name: "DPTHB-3 ",
                      type: "column",
                      data: series11,
                    },
                    {
                      name: "Polio-4 ",
                      type: "column",
                      data: series12,
                    },
                    {
                      name: "IPV ",
                      type: "column",
                      data: series13,
                    },
                    {
                      name: "Campak-Rubella ",
                      type: "column",
                      data: series14,
                    },
                    {
                      name: "IDL ",
                      type: "column",
                      data: series15,
                    },
                  ],
                  options: {
                    ...this.state.options,
                    dataLabels: {
                      ...this.state.options.dataLabels,
                      formatter: (value, data) => {
                        return value;
                      },
                    },
                    xaxis: {
                      ...this.state.options.xaxis,
                      categories: category,
                    },
                  },
                });
              }
            }
          );
        }
      }
    );
  };
  handleGraphicTahunControl = (event) => {
    let FinalSeries1 = 0;
    let FinalSeries2 = 0;
    let FinalSeries3 = 0;
    let FinalSeries4 = 0;
    let FinalSeries5 = 0;
    let FinalSeries6 = 0;
    let FinalSeries7 = 0;
    let FinalSeries8 = 0;
    let FinalSeries9 = 0;
    let FinalSeries10 = 0;
    let FinalSeries11 = 0;
    let FinalSeries12 = 0;
    let FinalSeries13 = 0;
    let FinalSeries14 = 0;
    let FinalSeries15 = 0;
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
        const series11 = [];
        const series12 = [];
        const series13 = [];
        const series14 = [];
        const series15 = [];
        let category = [];
        for (let a = 0; a < dataFinal.length; a++) {
          let SasaranBayiBaruLahirYear = 0;
          let SasaranSurvivingInfantYear = 0;
          let HBOLessOneDTMYear = 0;
          let HBOLessOneWTMYear = 0;
          let BCGThisMonthYear = 0;
          let CampakRubellaTMYear = 0;
          let Polio1ThisMonthYear = 0;
          let DPTHB1ThisMonthYear = 0;
          let Polio2ThisMonthYear = 0;
          let DPTHB2ThisMonthYear = 0;
          let Polio3ThisMonthYear = 0;
          let DPTHB3ThisMonthYear = 0;
          let Polio4ThisMonthYear = 0;
          let IPVThisMonthYear = 0;
          let IDLThisMonthYear = 0;

          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              if (
                this.state.yearIndex.toLowerCase() ===
                dataFinal[a].set[i].Tahun.toLowerCase()
              ) {
                SasaranSurvivingInfantYear =
                  SasaranSurvivingInfantYear +
                  dataFinal[a].set[c].SasaranSurvivingInfant;
                HBOLessOneDTMYear =
                  HBOLessOneDTMYear + dataFinal[a].set[c].HBOLessOneDTM;
                HBOLessOneWTMYear =
                  HBOLessOneWTMYear + dataFinal[a].set[c].HBOLessOneWTM;
                BCGThisMonthYear =
                  BCGThisMonthYear + dataFinal[a].set[c].BCGThisMonth;
                CampakRubellaTMYear =
                  CampakRubellaTMYear + dataFinal[a].set[c].CampakRubellaTM;
                Polio1ThisMonthYear =
                  Polio1ThisMonthYear + dataFinal[a].set[c].Polio1ThisMonth;
                DPTHB1ThisMonthYear =
                  DPTHB1ThisMonthYear + dataFinal[a].set[c].DPTHB1ThisMonth;
                Polio2ThisMonthYear =
                  Polio2ThisMonthYear + dataFinal[a].set[c].Polio2ThisMonth;
                DPTHB2ThisMonthYear =
                  DPTHB2ThisMonthYear + dataFinal[a].set[c].DPTHB2ThisMonth;
                Polio3ThisMonthYear =
                  Polio3ThisMonthYear + dataFinal[a].set[c].Polio3ThisMonth;
                DPTHB3ThisMonthYear =
                  DPTHB3ThisMonthYear + dataFinal[a].set[c].DPTHB3ThisMonth;
                Polio4ThisMonthYear =
                  Polio4ThisMonthYear + dataFinal[a].set[c].Polio4ThisMonth;
                IPVThisMonthYear =
                  IPVThisMonthYear + dataFinal[a].set[c].IPVThisMonth;
                IDLThisMonthYear =
                  IDLThisMonthYear + dataFinal[a].set[c].IDLThisMonth;
                SasaranBayiBaruLahirYear =
                  SasaranBayiBaruLahirYear +
                  dataFinal[a].set[c].SasaranBayiBaruLahir;
              }
            }
            series1.push(SasaranBayiBaruLahirYear);
            series2.push(SasaranSurvivingInfantYear);
            series3.push(HBOLessOneDTMYear);
            series4.push(HBOLessOneWTMYear);
            series5.push(BCGThisMonthYear);
            series6.push(Polio1ThisMonthYear);
            series7.push(DPTHB1ThisMonthYear);
            series8.push(Polio2ThisMonthYear);
            series9.push(DPTHB2ThisMonthYear);
            series10.push(Polio3ThisMonthYear);
            series11.push(DPTHB3ThisMonthYear);
            series12.push(Polio4ThisMonthYear);
            series13.push(IDLThisMonthYear);
            series14.push(CampakRubellaTMYear);
            series15.push(IPVThisMonthYear);
            category.push(dataFinal[a].Puskesmas);
          }
        }
        for (let s1 = 0; s1 < series1.length; s1++) {
          FinalSeries1 = FinalSeries1 + series1[s1];
        }
        for (let s2 = 0; s2 < series2.length; s2++) {
          FinalSeries2 = FinalSeries2 + series2[s2];
        }
        for (let s3 = 0; s3 < series3.length; s3++) {
          FinalSeries3 = FinalSeries3 + series3[s3];
        }
        for (let s4 = 0; s4 < series4.length; s4++) {
          FinalSeries4 = FinalSeries4 + series4[s4];
        }
        for (let s5 = 0; s5 < series5.length; s5++) {
          FinalSeries5 = FinalSeries5 + series5[s5];
        }
        for (let s6 = 0; s6 < series6.length; s6++) {
          FinalSeries6 = FinalSeries6 + series6[s6];
        }
        for (let s7 = 0; s7 < series7.length; s7++) {
          FinalSeries7 = FinalSeries7 + series7[s7];
        }
        for (let s8 = 0; s8 < series8.length; s8++) {
          FinalSeries8 = FinalSeries8 + series8[s8];
        }
        for (let s9 = 0; s9 < series9.length; s9++) {
          FinalSeries9 = FinalSeries9 + series9[s9];
        }
        for (let s10 = 0; s10 < series10.length; s10++) {
          FinalSeries10 = FinalSeries10 + series10[s10];
        }
        for (let s11 = 0; s11 < series11.length; s11++) {
          FinalSeries11 = FinalSeries11 + series11[s11];
        }
        for (let s12 = 0; s12 < series12.length; s12++) {
          FinalSeries12 = FinalSeries12 + series12[s12];
        }
        for (let s13 = 0; s13 < series13.length; s13++) {
          FinalSeries13 = FinalSeries13 + series13[s13];
        }
        for (let s14 = 0; s14 < series14.length; s14++) {
          FinalSeries14 = FinalSeries14 + series14[s14];
        }
        for (let s15 = 0; s15 < series15.length; s15++) {
          FinalSeries15 = FinalSeries15 + series15[s15];
        }
        series1.push(FinalSeries1);
        series2.push(FinalSeries2);
        series3.push(FinalSeries3);
        series4.push(FinalSeries4);
        series5.push(FinalSeries5);
        series6.push(FinalSeries6);
        series7.push(FinalSeries7);
        series8.push(FinalSeries8);
        series9.push(FinalSeries9);
        series10.push(FinalSeries10);
        series11.push(FinalSeries11);
        series12.push(FinalSeries12);
        series13.push(FinalSeries13);
        series14.push(FinalSeries14);
        series15.push(FinalSeries15);
        category.push("PUSKESMAS SUMBER WRINGIN");
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
              name: "HBO < 24 Jam ",
              type: "column",
              data: series3,
            },

            {
              name: "HBO 0-7 hari ",
              type: "column",
              data: series4,
            },
            {
              name: "BCG ",
              type: "column",
              data: series5,
            },
            {
              name: "Polio-1 ",
              type: "column",
              data: series6,
            },
            {
              name: "DPTHB-1 ",
              type: "column",
              data: series7,
            },
            {
              name: "Polio-2 ",
              type: "column",
              data: series8,
            },
            {
              name: "DPTHB-2 ",
              type: "column",
              data: series9,
            },
            {
              name: "Polio-3 ",
              type: "column",
              data: series10,
            },
            {
              name: "DPTHB-3 ",
              type: "column",
              data: series11,
            },
            {
              name: "Polio-4 ",
              type: "column",
              data: series12,
            },
            {
              name: "IPV ",
              type: "column",
              data: series13,
            },
            {
              name: "Campak-Rubella ",
              type: "column",
              data: series14,
            },
            {
              name: "IDL ",
              type: "column",
              data: series15,
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
            title="Grafik Imunisasi"
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
                sx={{ width: 0.95, ml: 2 }}
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
                sx={{ width: 0.95, mr: 1 }}
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
    data: state.firestore.ordered.Imunisasi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Imunisasi" }]),
  connect(mapStateToProps),
  withTheme
)(GraphicCocPKMImun);
