import React, { Component } from "react";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Box, Button, Grid } from "@mui/material";
import { withTheme } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
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
  handleChangeBulan = () => {
    const { data } = this.props;
    console.log(this.state, data);
    const desaTemp = [];
    for (let i = 0; i < data.length; i++) {
      desaTemp.push(data[i].Puskesmas);
    }
    const desa = Array.from(new Set(desaTemp));
    console.log(this.state);
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

    // const desaTemp = [];
    // for (let i = 0; i < data.length; i++) {
    //   desaTemp.push(data[i].Puskesmas);
    // }
    // const desa = Array.from(new Set(desaTemp));
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
        let SasaranBayiBaruLahirBulan = 0;
        for (let a = 0; a < dataFinal.length; a++) {
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
          SasaranBayiBaruLahirBulan = 0;
          // for (let b = 0; b < this.state.desaIndex.length; b++) {
          //   if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
          //     for (let i = 0; i < dataFinal[i].set.length; i++) {
          //       if (
          //         this.state.monthIndex.toLowerCase() ===
          //           dataFinal[a].set[i].Bulan.toLowerCase() &&
          //         this.state.yearIndex === dataFinal[a].set[i].Tahun
          //       ) {
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
              for (let i = 0; i < dataFinal[i].set.length; i++) {
                for (let c = 0; c < this.state.monthIndex.length; c++) {
                  if (
                    this.state.monthIndex[c]?.toLowerCase() ===
                      dataFinal[a].set[i].Bulan.toLowerCase() &&
                    this.state.yearIndex === dataFinal[a].set[i].Tahun
                  ) {
                    // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                    SasaranBayiBaruLahirBulan =
                      SasaranBayiBaruLahirBulan +
                      dataFinal[a].set[i].SasaranBayiBaruLahir;
                    SasaranSurvivingInfantBulan =
                      SasaranSurvivingInfantBulan +
                      dataFinal[a].set[i].SasaranSurvivingInfant;
                    HBOLessOneDTMBulan =
                      HBOLessOneDTMBulan + dataFinal[a].set[c].HBOLessOneDTM;
                    HBOLessOneWTMBulan =
                      HBOLessOneWTMBulan + dataFinal[a].set[c].HBOLessOneWTM;
                    BCGThisMonthBulan =
                      BCGThisMonthBulan + dataFinal[a].set[c].BCGThisMonth;
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
                      IPVThisMonthBulan + dataFinal[a].set[c].IPVThisMonth;
                    IDLThisMonthBulan =
                      IDLThisMonthBulan + dataFinal[a].set[c].IDLThisMonth;
                  }
                }
              }
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
              series1.push(SasaranBayiBaruLahirBulan);
              category.push(dataFinal[a].Puskesmas);
              // console.log(series, series2);
            }
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
        for (let c = 0; c < data.length; c++) {
          desaTemp.push(data[c].Puskesmas);
        }
        const desa = Array.from(new Set(desaTemp));
        // console.log(dataFinal, this.state, desa);
        const series = [];
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
        const category = [];
        for (let a = 0; a < dataFinal.length; a++) {
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
          let SasaranBayiBaruLahirYear = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let c = 0; c < dataFinal[c].set.length; c++) {
              if (
                this.state.yearIndex.toLowerCase() ===
                dataFinal[a].set[c].Tahun.toString()
              ) {
                // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
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
            series.push(SasaranBayiBaruLahirYear);
            series2.push(SasaranSurvivingInfantYear);
            series3.push(HBOLessOneDTMYear);
            series4.push(HBOLessOneWTMYear);
            series5.push(BCGThisMonthYear);
            series6.push(CampakRubellaTMYear);
            series7.push(Polio1ThisMonthYear);
            series8.push(DPTHB1ThisMonthYear);
            series9.push(Polio2ThisMonthYear);
            series10.push(DPTHB2ThisMonthYear);
            series11.push(Polio3ThisMonthYear);
            series12.push(DPTHB3ThisMonthYear);
            series13.push(Polio4ThisMonthYear);
            series14.push(IPVThisMonthYear);
            series15.push(IDLThisMonthYear);

            category.push(dataFinal[a].Puskesmas);
            // console.log(series, series2);
          }
        }
        this.setState({
          series: [
            {
              name: "Sasaran BBL",
              type: "column",
              data: series,
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
            title="Program Imunisasi"
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
