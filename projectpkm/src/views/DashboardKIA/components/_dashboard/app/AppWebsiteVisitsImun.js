import React, { Component } from "react";
import _, { set } from "lodash";
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

class AppWebsiteVisitsImun extends Component {
  state = {
    monthIndex: "",
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
    desaIndex: "",
    desa: [],
    options: {
      stroke: { width: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
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
      plotOptions: { bar: { columnWidth: "65%", borderRadius: 3 } },
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
        name: "HBO < 24 Jam Bulan Ini",
        type: "column",
        data: [],
      },

      {
        name: "HBO 0-7 hari Bulan Ini",
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
        name: "Polio-1 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-1 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "Polio-2 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-2 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "Polio-3 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "DPTHB-3 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "Polio-4 Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "IPV Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "Campak-Rubella Bulan Ini",
        type: "column",
        data: [],
      },
      {
        name: "IDL Bulan Ini",
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
  handleChangeQuarter = () => {
    this.setState({
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
          name: "HBO < 24 Jam Bulan Ini",
          type: "column",
          data: [],
        },

        {
          name: "HBO 0-7 hari Bulan Ini",
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
          name: "Polio-1 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-1 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-2 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-2 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-3 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-3 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-4 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "IPV Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Campak-Rubella Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "IDL Bulan Ini",
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
      showBulanGraphic: false,
      showTahunGraphic: false,
      showChoiceGraphic: !this.state.showChoiceGraphic,
    });
  };

  handleChangeQuarter = () => {
    this.setState({
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
          name: "HBO < 24 Jam Bulan Ini",
          type: "column",
          data: [],
        },

        {
          name: "HBO 0-7 hari Bulan Ini",
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
          name: "Polio-1 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-1 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-2 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-2 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-3 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "DPTHB-3 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Polio-4 Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "IPV Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "Campak-Rubella Bulan Ini",
          type: "column",
          data: [],
        },
        {
          name: "IDL Bulan Ini",
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
      showBulanGraphic: false,
      showTahunGraphic: false,
      showChoiceGraphic: !this.state.showChoiceGraphic,
    });
  };
  handleChangeBulan = () => {
    const { data } = this.props;
    const desaTemp = [];
    for (let i = 0; i < data.length; i++) {
      desaTemp.push(data[i].Puskesmas);
    }
    const desa = Array.from(new set(desaTemp));
    this.setState(
      {
        monthIndex: "",
        desaIndex: desa,
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
            name: "HBO < 24 Jam Bulan Ini",
            type: "column",
            data: [],
          },

          {
            name: "HBO 0-7 hari Bulan Ini",
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
            name: "Polio-1 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-1 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-2 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-2 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-3 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-3 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-4 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "IPV Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Campak-Rubella Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "IDL Bulan Ini",
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
        const year = new Date().getFullYear();
        const yearList = [];
        for (let i = 0; i < 5; i++) {
          yearList.push("" + (year + i));
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
          var SasaranSurvivingInfantYear = 0;
          var HBOLessOneDTMYear = 0;
          var HBOLessOneWTMYear = 0;
          var BCGThisMonthYear = 0;
          var CampakRubellaTMYear = 0;
          var Polio1ThisMonthYear = 0;
          var DPTHB1ThisMonthYear = 0;
          var Polio2ThisMonthYear = 0;
          var DPTHB2ThisMonthYear = 0;
          var Polio3ThisMonthYear = 0;
          var DPTHB3ThisMonthYear = 0;
          var Polio4ThisMonthYear = 0;
          var IPVThisMonthYear = 0;
          var IDLThisMonthYear = 0;
          var SasaranBayiBaruLahirYear = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              // console.log(
              //   this.state.yearIndex.toLowerCase(),
              //   dataFinal[a].set[i].Tahun.toLowerCase()
              // );
              if (
                this.state.yearIndex.toLowerCase() ===
                dataFinal[a].set[i].Tahun.toLowerCase()
              ) {
                // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                SasaranSurvivingInfantYear =
                  SasaranSurvivingInfantYear +
                  dataFinal[a].set[i].SasaranSurvivingInfant;
                HBOLessOneDTMYear =
                  HBOLessOneDTMYear + dataFinal[a].set[i].HBOLessOneDTM;
                HBOLessOneWTMYear =
                  HBOLessOneWTMYear + dataFinal[a].set[i].HBOLessOneWTM;
                BCGThisMonthYear =
                  BCGThisMonthYear + dataFinal[a].set[i].BCGThisMonth;
                CampakRubellaTMYear =
                  CampakRubellaTMYear + dataFinal[a].set[i].CampakRubellaTM;
                Polio1ThisMonthYear =
                  Polio1ThisMonthYear + dataFinal[a].set[i].Polio1ThisMonth;
                DPTHB1ThisMonthYear =
                  DPTHB1ThisMonthYear + dataFinal[a].set[i].DPTHB1ThisMonth;
                Polio2ThisMonthYear =
                  Polio2ThisMonthYear + dataFinal[a].set[i].Polio2ThisMonth;
                DPTHB2ThisMonthYear =
                  DPTHB2ThisMonthYear + dataFinal[a].set[i].DPTHB2ThisMonth;
                Polio3ThisMonthYear =
                  Polio3ThisMonthYear + dataFinal[a].set[i].Polio3ThisMonth;
                DPTHB3ThisMonthYear =
                  DPTHB3ThisMonthYear + dataFinal[a].set[i].DPTHB3ThisMonth;
                Polio4ThisMonthYear =
                  Polio4ThisMonthYear + dataFinal[a].set[i].Polio4ThisMonth;
                IPVThisMonthYear =
                  IPVThisMonthYear + dataFinal[a].set[i].IPVThisMonth;
                IDLThisMonthYear =
                  IDLThisMonthYear + dataFinal[a].set[i].IDLThisMonth;
                SasaranBayiBaruLahirYear =
                  SasaranBayiBaruLahirYear +
                  dataFinal[a].set[i].SasaranBayiBaruLahir;
              }
            }

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
            series.push(SasaranBayiBaruLahirYear);
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
              name: "HBO < 24 Jam Bulan Ini",
              type: "column",
              data: series3,
            },

            {
              name: "HBO 0-7 hari Bulan Ini",
              type: "column",
              data: series4,
            },
            {
              name: "BCG Bulan Ini",
              type: "column",
              data: series5,
            },
            {
              name: "Polio-1 Bulan Ini",
              type: "column",
              data: series6,
            },
            {
              name: "DPTHB-1 Bulan Ini",
              type: "column",
              data: series7,
            },
            {
              name: "Polio-2 Bulan Ini",
              type: "column",
              data: series8,
            },
            {
              name: "DPTHB-2 Bulan Ini",
              type: "column",
              data: series9,
            },
            {
              name: "Polio-3 Bulan Ini",
              type: "column",
              data: series10,
            },
            {
              name: "DPTHB-3 Bulan Ini",
              type: "column",
              data: series11,
            },
            {
              name: "Polio-4 Bulan Ini",
              type: "column",
              data: series12,
            },
            {
              name: "IPV Bulan Ini",
              type: "column",
              data: series13,
            },
            {
              name: "Campak-Rubella Bulan Ini",
              type: "column",
              data: series14,
            },
            {
              name: "IDL Bulan Ini",
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
  handleChangeTahun = () => {
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
            name: "HBO < 24 Jam Bulan Ini",
            type: "column",
            data: [],
          },

          {
            name: "HBO 0-7 hari Bulan Ini",
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
            name: "Polio-1 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-1 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-2 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-2 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-3 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "DPTHB-3 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Polio-4 Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "IPV Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "Campak-Rubella Bulan Ini",
            type: "column",
            data: [],
          },
          {
            name: "IDL Bulan Ini",
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
  handleQuarterChange = (event) => {
    this.setState(
      {
        quarterIndex: event.target.value,
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
          var SasaranSurvivingInfantQuarter = 0;
          var HBOLessOneDTMQuarter = 0;
          var HBOLessOneWTMQuarter = 0;
          var BCGThisMonthQuarter = 0;
          var CampakRubellaTMQuarter = 0;
          var Polio1ThisMonthQuarter = 0;
          var DPTHB1ThisMonthQuarter = 0;
          var Polio2ThisMonthQuarter = 0;
          var DPTHB2ThisMonthQuarter = 0;
          var Polio3ThisMonthQuarter = 0;
          var DPTHB3ThisMonthQuarter = 0;
          var Polio4ThisMonthQuarter = 0;
          var IPVThisMonthQuarter = 0;
          var IDLThisMonthQuarter = 0;
          var SasaranBayiBaruLahirQuarter = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              for (let b = 0; b < this.state.quarterIndex.length; b++) {
                if (
                  this.state.quarterIndex[b].toLowerCase() ===
                  dataFinal[a].set[i].Bulan.toLowerCase()
                ) {
                  // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                  SasaranSurvivingInfantQuarter =
                    SasaranSurvivingInfantQuarter +
                    dataFinal[a].set[i].SasaranSurvivingInfant;
                  HBOLessOneDTMQuarter =
                    HBOLessOneDTMQuarter + dataFinal[a].set[i].HBOLessOneDTM;
                  HBOLessOneWTMQuarter =
                    HBOLessOneWTMQuarter + dataFinal[a].set[i].HBOLessOneWTM;
                  BCGThisMonthQuarter =
                    BCGThisMonthQuarter + dataFinal[a].set[i].BCGThisMonth;
                  CampakRubellaTMQuarter =
                    CampakRubellaTMQuarter +
                    dataFinal[a].set[i].CampakRubellaTM;
                  Polio1ThisMonthQuarter =
                    Polio1ThisMonthQuarter +
                    dataFinal[a].set[i].Polio1ThisMonth;
                  DPTHB1ThisMonthQuarter =
                    DPTHB1ThisMonthQuarter +
                    dataFinal[a].set[i].DPTHB1ThisMonth;
                  Polio2ThisMonthQuarter =
                    Polio2ThisMonthQuarter +
                    dataFinal[a].set[i].Polio2ThisMonth;
                  DPTHB2ThisMonthQuarter =
                    DPTHB2ThisMonthQuarter +
                    dataFinal[a].set[i].DPTHB2ThisMonth;
                  Polio3ThisMonthQuarter =
                    Polio3ThisMonthQuarter +
                    dataFinal[a].set[i].Polio3ThisMonth;
                  DPTHB3ThisMonthQuarter =
                    DPTHB3ThisMonthQuarter +
                    dataFinal[a].set[i].DPTHB3ThisMonth;
                  Polio4ThisMonthQuarter =
                    Polio4ThisMonthQuarter +
                    dataFinal[a].set[i].Polio4ThisMonth;
                  IPVThisMonthQuarter =
                    IPVThisMonthQuarter + dataFinal[a].set[i].IPVThisMonth;
                  IDLThisMonthQuarter =
                    IDLThisMonthQuarter + dataFinal[a].set[i].IDLThisMonth;
                  SasaranBayiBaruLahirQuarter =
                    SasaranBayiBaruLahirQuarter +
                    dataFinal[a].set[i].SasaranBayiBaruLahir;
                }
              }
            }

            series2.push(SasaranSurvivingInfantQuarter);
            series3.push(HBOLessOneDTMQuarter);
            series4.push(HBOLessOneWTMQuarter);
            series5.push(BCGThisMonthQuarter);
            series6.push(CampakRubellaTMQuarter);
            series7.push(Polio1ThisMonthQuarter);
            series8.push(DPTHB1ThisMonthQuarter);
            series9.push(Polio2ThisMonthQuarter);
            series10.push(DPTHB2ThisMonthQuarter);
            series11.push(Polio3ThisMonthQuarter);
            series12.push(DPTHB3ThisMonthQuarter);
            series13.push(Polio4ThisMonthQuarter);
            series14.push(IPVThisMonthQuarter);
            series15.push(IDLThisMonthQuarter);
            series.push(SasaranBayiBaruLahirQuarter);
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
              name: "HBO < 24 Jam Bulan Ini",
              type: "column",
              data: series3,
            },

            {
              name: "HBO 0-7 hari Bulan Ini",
              type: "column",
              data: series4,
            },
            {
              name: "BCG Bulan Ini",
              type: "column",
              data: series5,
            },
            {
              name: "Polio-1 Bulan Ini",
              type: "column",
              data: series6,
            },
            {
              name: "DPTHB-1 Bulan Ini",
              type: "column",
              data: series7,
            },
            {
              name: "Polio-2 Bulan Ini",
              type: "column",
              data: series8,
            },
            {
              name: "DPTHB-2 Bulan Ini",
              type: "column",
              data: series9,
            },
            {
              name: "Polio-3 Bulan Ini",
              type: "column",
              data: series10,
            },
            {
              name: "DPTHB-3 Bulan Ini",
              type: "column",
              data: series11,
            },
            {
              name: "Polio-4 Bulan Ini",
              type: "column",
              data: series12,
            },
            {
              name: "IPV Bulan Ini",
              type: "column",
              data: series13,
            },
            {
              name: "Campak-Rubella Bulan Ini",
              type: "column",
              data: series14,
            },
            {
              name: "IDL Bulan Ini",
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

  choiceGraphic = () => {
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
        <CardHeader title="Progress Imunisasi" />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={300}
          />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Bulan</InputLabel>
          <Select
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
            value={this.state.quarterIndex}
            onChange={this.handleQuarterChange}
            //=========================================================
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
      </div>
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
        <CardHeader title="Program Imunisasi" />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={300}
          />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Bulan</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.monthIndex}
            name="monthIndex"
            onChange={this.handleChange}
            label="Month"
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
            // labelId="demo-simple-select-helper-label"
            // id="demo-simple-select-helper"
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
      </div>
    );
  };
  tahunGraphic = () => {
    return (
      <div>
        <CardHeader title="Program Imunisasi" />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={300}
          />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Tahun</InputLabel>
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
    const category = [];
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
        for (let a = 0; a < dataFinal.length; a++) {
          var SasaranSurvivingInfantBulan = 0;
          var HBOLessOneDTMBulan = 0;
          var HBOLessOneWTMBulan = 0;
          var BCGThisMonthBulan = 0;
          var CampakRubellaTMBulan = 0;
          var Polio1ThisMonthBulan = 0;
          var DPTHB1ThisMonthBulan = 0;
          var Polio2ThisMonthBulan = 0;
          var DPTHB2ThisMonthBulan = 0;
          var Polio3ThisMonthBulan = 0;
          var DPTHB3ThisMonthBulan = 0;
          var Polio4ThisMonthBulan = 0;
          var IPVThisMonthBulan = 0;
          var IDLThisMonthBulan = 0;
          var SasaranBayiBaruLahirBulan = 0;
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
              for (let i = 0; i < dataFinal[i].set.length; i++) {
                if (
                  this.state.monthIndex.toLowerCase() ===
                    dataFinal[a].set[i].Bulan.toLowerCase() &&
                  this.state.yearIndex === dataFinal[a].set[i].Tahun
                ) {
                  // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                  SasaranSurvivingInfantBulan =
                    SasaranSurvivingInfantBulan +
                    dataFinal[a].set[i].SasaranSurvivingInfant;
                  HBOLessOneDTMBulan =
                    HBOLessOneDTMBulan + dataFinal[a].set[i].HBOLessOneDTM;
                  HBOLessOneWTMBulan =
                    HBOLessOneWTMBulan + dataFinal[a].set[i].HBOLessOneWTM;
                  BCGThisMonthBulan =
                    BCGThisMonthBulan + dataFinal[a].set[i].BCGThisMonth;
                  CampakRubellaTMBulan =
                    CampakRubellaTMBulan + dataFinal[a].set[i].CampakRubellaTM;
                  Polio1ThisMonthBulan =
                    Polio1ThisMonthBulan + dataFinal[a].set[i].Polio1ThisMonth;
                  DPTHB1ThisMonthBulan =
                    DPTHB1ThisMonthBulan + dataFinal[a].set[i].DPTHB1ThisMonth;
                  Polio2ThisMonthBulan =
                    Polio2ThisMonthBulan + dataFinal[a].set[i].Polio2ThisMonth;
                  DPTHB2ThisMonthBulan =
                    DPTHB2ThisMonthBulan + dataFinal[a].set[i].DPTHB2ThisMonth;
                  Polio3ThisMonthBulan =
                    Polio3ThisMonthBulan + dataFinal[a].set[i].Polio3ThisMonth;
                  DPTHB3ThisMonthBulan =
                    DPTHB3ThisMonthBulan + dataFinal[a].set[i].DPTHB3ThisMonth;
                  Polio4ThisMonthBulan =
                    Polio4ThisMonthBulan + dataFinal[a].set[i].Polio4ThisMonth;
                  IPVThisMonthBulan =
                    IPVThisMonthBulan + dataFinal[a].set[i].IPVThisMonth;
                  IDLThisMonthBulan =
                    IDLThisMonthBulan + dataFinal[a].set[i].IDLThisMonth;
                  SasaranBayiBaruLahirBulan =
                    SasaranBayiBaruLahirBulan +
                    dataFinal[a].set[i].SasaranBayiBaruLahir;
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
              name: "HBO < 24 Jam Bulan Ini",
              type: "column",
              data: series3,
            },

            {
              name: "HBO 0-7 hari Bulan Ini",
              type: "column",
              data: series4,
            },
            {
              name: "BCG Bulan Ini",
              type: "column",
              data: series5,
            },
            {
              name: "Polio-1 Bulan Ini",
              type: "column",
              data: series6,
            },
            {
              name: "DPTHB-1 Bulan Ini",
              type: "column",
              data: series7,
            },
            {
              name: "Polio-2 Bulan Ini",
              type: "column",
              data: series8,
            },
            {
              name: "DPTHB-2 Bulan Ini",
              type: "column",
              data: series9,
            },
            {
              name: "Polio-3 Bulan Ini",
              type: "column",
              data: series10,
            },
            {
              name: "DPTHB-3 Bulan Ini",
              type: "column",
              data: series11,
            },
            {
              name: "Polio-4 Bulan Ini",
              type: "column",
              data: series12,
            },
            {
              name: "IPV Bulan Ini",
              type: "column",
              data: series13,
            },
            {
              name: "Campak-Rubella Bulan Ini",
              type: "column",
              data: series14,
            },
            {
              name: "IDL Bulan Ini",
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
    //===============================================================================================================================
    const { data } = this.props;
    console.log(this.state, data);
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
          {this.state.showChoiceGraphic ? <this.choiceGraphic /> : null}
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
