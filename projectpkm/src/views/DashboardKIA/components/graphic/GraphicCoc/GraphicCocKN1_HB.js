// KN1, HB Uniject, Kn lengkap
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

class GraphicCocKN1_HB extends Component {
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
        name: "KN 1",
        type: "column",
        data: [],
      },
      {
        name: "HB Uniject",
        type: "column",
        data: [],
      },
      {
        name: "KN Lengkap",
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
    const { KIA } = this.props;
    const desaTemp = ["PUSKESMAS SUMBER WRINGIN"];
    for (let i = 0; i < KIA.length; i++) {
      desaTemp.push(KIA[i].Puskesmas.replace(/ /g, ""));
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
            name: "KN 1",
            type: "column",
            data: [],
          },
          {
            name: "HB Uniject",
            type: "column",
            data: [],
          },
          {
            name: "KN Lengkap",
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
        const yearTemp = _.chain(KIA)
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
    const { KIA, Gizi, Imunisasi } = this.props;
    const dataKIA = _.chain(KIA)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
    const dataGizi = _.chain(Gizi)
      .groupBy("Puskesmas")
      .map((set, Puskesmas) => ({ set, Puskesmas }))
      .value();
    const dataImunisasi = _.chain(Imunisasi)
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
        let category = [];
        let kn1 = 0;
        let HbUniject = 0;
        let knLengkap = 0;

        if (this.state.desaIndex == "PUSKESMAS SUMBER WRINGIN") {
          this.setState(
            {
              desaIndex: ["PUSKESMAS SUMBER WRINGIN"],
            },
            () => {
              let FinalSeries1 = 0;
              let FinalSeries2 = 0;
              let FinalSeries3 = 0;
              this.setState(
                {
                  series: [
                    {
                      name: "Balita Paripurna",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Vitamin A1",
                      type: "column",
                      data: [],
                    },
                    {
                      name: "Imunisasi Lanjutan",
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
                  for (let a = 0; a < this.state.desaIndex.length; a++) {
                    kn1 = 0;
                    HbUniject = 0;
                    knLengkap = 0;
                    for (let h = 0; h < this.state.monthIndex.length; h++) {
                      for (let b = 0; b < dataKIA.length; b++) {
                        for (let e = 0; e < dataKIA[b].set.length; e++) {
                          if (
                            this.state.monthIndex[h].toLowerCase() ===
                              dataKIA[b].set[e].Bulan.toLowerCase() &&
                            this.state.yearIndex === dataKIA[b].set[e].Tahun
                          ) {
                            kn1 = kn1 + dataKIA[b].set[e].PencapaianKNPertamaTL;
                            HbUniject = HbUniject;
                            knLengkap =
                              knLengkap +
                              dataKIA[b].set[e].PencapaianKNLengkapTL;
                          }
                        }
                        //   category.push(dataFinalTripleEliminasi[a].Puskesmas);\
                      }
                      for (let c = 0; c < dataGizi.length; c++) {
                        for (let f = 0; f < dataGizi[c].set.length; f++) {
                          if (
                            this.state.monthIndex[h].toLowerCase() ===
                              dataGizi[c].set[f].Bulan.toLowerCase() &&
                            this.state.yearIndex === dataGizi[c].set[f].Tahun
                          ) {
                            // VitA = VitA + dataGizi[c].set[f].JmlVitAMr;
                          }
                        }
                      }
                      for (let d = 0; d < dataImunisasi.length; d++) {
                        for (let g = 0; g < dataImunisasi[d].set.length; g++) {
                          if (
                            this.state.monthIndex[h].toLowerCase() ===
                              dataImunisasi[d].set[g].Bulan.toLowerCase() &&
                            this.state.yearIndex ===
                              dataImunisasi[d].set[g].Tahun
                          ) {
                            // Iml = Iml;
                          }
                        }
                      }
                    }
                    series1.push(kn1);
                    series2.push(HbUniject);
                    series3.push(knLengkap);
                    category.push(this.state.desaIndex[a]);
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
                  if (this.state.ChangeIndex == "Persentase") {
                    this.setState(
                      {
                        series: [
                          {
                            name: "KN 1",
                            type: "column",
                            data: [FinalSeries1],
                          },
                          {
                            name: "HB Uniject",
                            type: "column",
                            data: [FinalSeries2],
                          },
                          {
                            name: "KN Lengkap",
                            type: "column",
                            data: [FinalSeries3],
                          },
                        ],
                        options: {
                          ...this.state.options,
                          dataLabels: {
                            ...this.state.options.dataLabels,
                            formatter: (value, data) => {
                              return value;
                              // console.log(data);
                              // if (data.seriesIndex == 0) {
                              //   let percentage = 0;
                              //   percentage =
                              //     (
                              //       (data.w.config.series[0].data[
                              //         data.dataPointIndex
                              //       ] /
                              //         FinalSasaran) *
                              //       100
                              //     ).toFixed(1) + " %";
                              //   return percentage;
                              // } else if (data.seriesIndex == 1) {
                              //   let percentage = 0;
                              //   percentage =
                              //     (
                              //       (data.w.config.series[1].data[
                              //         data.dataPointIndex
                              //       ] /
                              //         FinalSasaran) *
                              //       100
                              //     ).toFixed(1) + " %";
                              //   return percentage;
                              // } else if (data.seriesIndex === 2) {
                              //   let percentage = 0;
                              //   percentage =
                              //     (
                              //       (data.w.config.series[2].data[
                              //         data.dataPointIndex
                              //       ] /
                              //         FinalSasaran) *
                              //       100
                              //     ).toFixed(1) + " %";
                              //   return percentage;
                              // } else {
                              //   return value;
                              // }
                            },
                          },
                          xaxis: {
                            ...this.state.options.xaxis,
                            categories: category,
                          },
                          // yaxis: {
                          //   ...this.state.options.yaxis,
                          //   max: 100,
                          // },
                        },
                      },
                      () => {}
                    );
                  } else {
                    this.setState(
                      {
                        series: [
                          {
                            name: "KN 1",
                            type: "column",
                            data: [FinalSeries1],
                          },
                          {
                            name: "HB Uniject",
                            type: "column",
                            data: [FinalSeries2],
                          },
                          {
                            name: "KN Lengkap",
                            type: "column",
                            data: [FinalSeries3],
                          },
                        ],
                        options: {
                          ...this.state.options,
                          dataLabels: {
                            ...this.state.options.dataLabels,
                            formatter: (value, data) => {
                              console.log(data);
                              return value;
                            },
                          },
                          xaxis: {
                            ...this.state.options.xaxis,
                            categories: category,
                          },
                          // yaxis: {
                          //   ...this.state.options.yaxis,
                          //   max: FinalSasaran,
                          // },
                        },
                      },
                      () => {}
                    );
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
              for (let a = 0; a < this.state.desaIndex.length; a++) {
                kn1 = 0;
                HbUniject = 0;
                knLengkap = 0;
                for (let h = 0; h < this.state.monthIndex.length; h++) {
                  for (let b = 0; b < dataKIA.length; b++) {
                    if (
                      dataKIA[b].Puskesmas.replace(/ /g, "").toLowerCase() ==
                      this.state.desaIndex[a].toLowerCase()
                    ) {
                      for (let e = 0; e < dataKIA[b].set.length; e++) {
                        if (
                          this.state.monthIndex[h].toLowerCase() ===
                            dataKIA[b].set[e].Bulan.toLowerCase() &&
                          this.state.yearIndex === dataKIA[b].set[e].Tahun
                        ) {
                          kn1 = kn1 + dataKIA[b].set[e].PencapaianKNPertamaTL;
                          HbUniject = HbUniject;
                          knLengkap =
                            knLengkap + dataKIA[b].set[e].PencapaianKNLengkapTL;
                        }
                      }
                    }
                    //   category.push(dataFinalTripleEliminasi[a].Puskesmas);\
                  }
                  for (let c = 0; c < dataGizi.length; c++) {
                    if (
                      dataGizi[c].Puskesmas.replace(/ /g, "").toLowerCase() ==
                      this.state.desaIndex[a].toLowerCase()
                    ) {
                      for (let f = 0; f < dataGizi[c].set.length; f++) {
                        if (
                          this.state.monthIndex[h].toLowerCase() ===
                            dataGizi[c].set[f].Bulan.toLowerCase() &&
                          this.state.yearIndex === dataGizi[c].set[f].Tahun
                        ) {
                          // VitA = VitA + dataGizi[c].set[f].JmlVitAMr;
                        }
                      }
                    }
                  }
                  for (let d = 0; d < dataImunisasi.length; d++) {
                    if (
                      dataImunisasi[d].Puskesmas.replace(
                        / /g,
                        ""
                      ).toLowerCase() == this.state.desaIndex[a].toLowerCase()
                    ) {
                      for (let g = 0; g < dataImunisasi[d].set.length; g++) {
                        if (
                          this.state.monthIndex[h].toLowerCase() ===
                            dataImunisasi[d].set[g].Bulan.toLowerCase() &&
                          this.state.yearIndex === dataImunisasi[d].set[g].Tahun
                        ) {
                          // Iml = Iml;
                        }
                      }
                    }
                  }
                }
                series1.push(kn1);
                series2.push(HbUniject);
                series3.push(knLengkap);
                category.push(this.state.desaIndex[a]);
              }
              if (this.state.ChangeIndex == "Persentase") {
                this.setState(
                  {
                    series: [
                      {
                        name: "KN 1",
                        type: "column",
                        data: series1,
                      },
                      {
                        name: "HB Uniject",
                        type: "column",
                        data: series2,
                      },
                      {
                        name: "KN Lengkap",
                        type: "column",
                        data: series3,
                      },
                    ],
                    options: {
                      ...this.state.options,
                      dataLabels: {
                        ...this.state.options.dataLabels,
                        formatter: (value, data) => {
                          return value;
                          // console.log(data);
                          // if (data.seriesIndex == 0) {
                          //   let percentage = 0;
                          //   percentage =
                          //     (
                          //       (data.w.config.series[0].data[
                          //         data.dataPointIndex
                          //       ] /
                          //         Sasaran) *
                          //       100
                          //     ).toFixed(1) + " %";
                          //   return percentage;
                          // } else if (data.seriesIndex == 1) {
                          //   let percentage = 0;
                          //   percentage =
                          //     (
                          //       (data.w.config.series[1].data[
                          //         data.dataPointIndex
                          //       ] /
                          //         Sasaran) *
                          //       100
                          //     ).toFixed(1) + " %";
                          //   return percentage;
                          // } else if (data.seriesIndex == 2) {
                          //   let percentage = 0;
                          //   percentage =
                          //     (
                          //       (data.w.config.series[2].data[
                          //         data.dataPointIndex
                          //       ] /
                          //         Sasaran) *
                          //       100
                          //     ).toFixed(1) + " %";
                          //   return percentage;
                          // } else {
                          //   return value;
                          // }
                        },
                      },
                      xaxis: {
                        ...this.state.options.xaxis,
                        categories: category,
                      },
                    },
                  },
                  () => {}
                );
              } else {
                this.setState(
                  {
                    series: [
                      {
                        name: "KN 1",
                        type: "column",
                        data: series1,
                      },
                      {
                        name: "HB Uniject",
                        type: "column",
                        data: series2,
                      },
                      {
                        name: "KN Lengkap",
                        type: "column",
                        data: series3,
                      },
                    ],
                    options: {
                      ...this.state.options,
                      dataLabels: {
                        ...this.state.options.dataLabels,
                        formatter: (value, data) => {
                          console.log(data);
                          return value;
                        },
                      },
                      xaxis: {
                        ...this.state.options.xaxis,
                        categories: category,
                      },
                    },
                  },
                  () => {}
                );
              }
            }
          );
        }
      }
    );
  };
  render() {
    const { KIA } = this.props;
    if (KIA == undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <RootStyle>
          <CardHeader
            title="COC KN-1, HB Uniject, KN Lengkap"
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
    KIA: state.firestore.ordered.KIA, //database
    Gizi: state.firestore.ordered.Gizi, //database
    Imunisasi: state.firestore.ordered.Imunisasi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([
    { collection: "KIA" },
    { collection: "Gizi" },
    { collection: "Imunisasi" },
  ]),
  connect(mapStateToProps),
  withTheme
)(GraphicCocKN1_HB);
