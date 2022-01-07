// k1 bumil, Fe1 - Gizi, Triple Eliminasi, k4 SPM, Linakes
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

class GraphicCocK1_FE1 extends Component {
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
      stroke: { width: [3, 3, 3, 3, 3, 3] },
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
      ],
      fill: {
        type: ["solid", "solid", "solid", "solid", "solid", "solid"],
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
        name: "Neonatal Komplikasi Laki - Laki",
        type: "column",
        data: [],
      },
      {
        name: "Neonatal Komplikasi Perempuan",
        type: "column",
        data: [],
      },
      {
        name: "Neonatal Komplikasi Total",
        type: "column",
        data: [],
      },

      {
        name: "Kunjungan Bayi Paripurna Laki - Laki",
        type: "column",
        data: [],
      },
      {
        name: "Kunjungan Bayi Paripurna Perempuan",
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
    const { TripleEliminasi } = this.props;
    const desaTemp = [];
    for (let i = 0; i < TripleEliminasi.length; i++) {
      desaTemp.push(TripleEliminasi[i].Puskesmas);
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
            name: "Neonatal Komplikasi Laki - Laki",
            type: "column",
            data: [],
          },
          {
            name: "Neonatal Komplikasi Perempuan",
            type: "column",
            data: [],
          },
          {
            name: "Neonatal Komplikasi Total",
            type: "column",
            data: [],
          },

          {
            name: "Kunjungan Bayi Paripurna Laki - Laki",
            type: "column",
            data: [],
          },
          {
            name: "Kunjungan Bayi Paripurna Perempuan",
            type: "column",
            data: [],
          },
          {
            name: "Kunjungan Bayi Paripurna Total",
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
        const yearTemp = _.chain(TripleEliminasi)
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
      </div>
    );
  };
  handleChange = (event) => {
    const { TripleEliminasi, K1, Gizi } = this.props;
    const dataFinalTripleEliminasi = _.chain(TripleEliminasi)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
    const dataFinalK1 = _.chain(K1)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
    const dataFinalGizi = _.chain(Gizi)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
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
        let k1 = 0;
        let fe1 = 0;
        let tripleEliminasi = 0;
        let k4Spm = 0;
        let Linakes = 0;
        for (
          let a = 0;
          a < dataFinalTripleEliminasi.length ||
          a < dataFinalK1.length ||
          a < dataFinalGizi.length;
          a++
        ) {
          k1 = 0;
          fe1 = 0;
          tripleEliminasi = 0;
          k4Spm = 0;
          Linakes = 0;
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (
              dataFinalTripleEliminasi[a].Puskesmas == this.state.desaIndex[b]
            ) {
              for (let i = 0; i < dataFinalTripleEliminasi[i].set.length; i++) {
                for (let c = 0; c < this.state.monthIndex.length; c++) {
                  if (
                    this.state.monthIndex[c]?.toLowerCase() ===
                      dataFinalTripleEliminasi[a].set[i].Bulan.toLowerCase() &&
                    this.state.yearIndex ===
                      dataFinalTripleEliminasi[a].set[i].Tahun
                  ) {
                    k1 = k1 + dataFinalTripleEliminasi[a].set[i].K1Bumil;
                    fe1 = fe1 + dataFinalGizi[a].set[i].JmlFe1;
                    tripleEliminasi = 0;
                    k4Spm = k4Spm + dataFinalK1[a].set[i].K4SPMBumil;
                    Linakes = Linakes + dataFinalK1[a].set[i].Linakes;
                  }
                }
              }
              series1.push(k1);
              series2.push(fe1);
              series3.push(tripleEliminasi);
              series4.push(k4Spm);
              series5.push(Linakes);
              category.push(dataFinalTripleEliminasi[a].Puskesmas);
            }
          }
        }
        this.setState({
          series: [
            {
              name: "K1 Bumil",
              type: "column",
              data: series1,
            },
            {
              name: "FE-1",
              type: "column",
              data: series2,
            },
            {
              name: "Triple Eliminasi",
              type: "column",
              data: series3,
            },

            {
              name: "K4 SPM",
              type: "column",
              data: series4,
            },
            {
              name: "Linakes",
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
    if (this.props.firebase.auth.isLoaded == false) {
      return <div>Loading...</div>;
    } else {
      return (
        <RootStyle>
          <CardHeader
            title="COC K1 Bumil, FE-1, Triple Eliminsasi, K4 SPM, Linakes"
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
            <Grid item xs={12} md={12} lg={12}>
              <Button
                variant="outlined"
                onClick={this.handleChangeBulan}
                style={{ justifyContent: "center" }}
                sx={{ width: 0.95, ml: 2 }}
              >
                Grafik Bulan
              </Button>
            </Grid>
          </Grid>
          {this.state.showBulanGraphic ? <this.bulanGraphic /> : null}
        </RootStyle>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    TripleEliminasi: state.firestore.ordered.TripleEliminasi, //database
    K1: state.firestore.ordered.K1, //database
    Gizi: state.firestore.ordered.Gizi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([
    { collection: "TripleEliminasi" },
    { collection: "COC-K1", storeAs: "K1" },
    { collection: "Gizi" },
    { collection: "Auth" },
  ]),
  connect(mapStateToProps),
  withTheme
)(GraphicCocK1_FE1);
