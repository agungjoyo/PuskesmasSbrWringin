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
        type: ["solid", "solid", "solid", "solid"],
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
      {
        name: "Pencapain KN Lengkap",
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
        {
          name: "Pencapaian KN Lengkap",
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
    const desa = Array.from(new Set(desaTemp));
    this.setState(
      {
        monthIndex: "",
        desaIndex: desa,
        yearIndex: "",
        desa: desa,
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
          {
            name: "Pencapaian KN Lengkap",
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
        const category = [];
        for (let a = 0; a < dataFinal.length; a++) {
          var lahirHidupYear = 0;
          var lahirMatiYear = 0;
          var sasaran = 0;
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
                lahirHidupYear =
                  lahirHidupYear + dataFinal[a].set[i].PencapaianLahirHidupTL;
                lahirMatiYear =
                  lahirMatiYear + dataFinal[a].set[i].PencapaianLahirMatiTL;
                // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                sasaran = dataFinal[a].set[i].SasaranBayiTL;
              }
            }
            series2.push(lahirHidupYear);
            series3.push(lahirMatiYear);
            series.push(sasaran);
            category.push(dataFinal[a].Puskesmas);
            // console.log(series, series2);
          }
        }
        this.setState({
          series: [
            {
              name: "Sasaran",
              type: "column",
              data: series,
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
  handleChangeTahun = () => {
    this.setState(
      {
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
        const category = [];
        for (let a = 0; a < dataFinal.length; a++) {
          var lahirHidupQuarter = 0;
          var lahirMatiQuarter = 0;
          var sasaran = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              for (let b = 0; b < this.state.quarterIndex.length; b++) {
                if (
                  this.state.quarterIndex[b].toLowerCase() ===
                  dataFinal[a].set[i].Bulan.toLowerCase()
                ) {
                  lahirHidupQuarter =
                    lahirHidupQuarter +
                    dataFinal[a].set[i].PencapaianLahirHidupTL;
                  lahirMatiQuarter =
                    lahirMatiQuarter +
                    dataFinal[a].set[i].PencapaianLahirMatiTL;
                  // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                  sasaran = dataFinal[a].set[i].SasaranBayiTL;
                }
              }
            }
            series2.push(lahirHidupQuarter);
            series3.push(lahirMatiQuarter);
            series.push(sasaran);
            category.push(dataFinal[a].Puskesmas);
            // console.log(series, series2);
          }
        }
        this.setState({
          series: [
            {
              name: "Sasaran",
              type: "column",
              data: series,
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
            // labelId="demo-simple-select-helper-label"
            // id="demo-simple-select-helper"
            // value={this.state.monthIndex}
            // onChange={this.handleChange}
            // label="Month"
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
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.monthIndex}
            name="monthIndex"
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
    // console.log(event.target);
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        for (let a = 0; a < dataFinal.length; a++) {
          var lahirHidupBulan = 0;
          var lahirMatiBulan = 0;
          var pencapaianKNTL = 0;
          var sasaran = 0;
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
              for (let i = 0; i < dataFinal[i].set.length; i++) {
                if (
                  this.state.monthIndex.toLowerCase() ===
                    dataFinal[a].set[i].Bulan.toLowerCase() &&
                  this.state.yearIndex === dataFinal[a].set[i].Tahun
                ) {
                  lahirHidupBulan = dataFinal[a].set[i].PencapaianLahirHidupTL;
                  lahirMatiBulan = dataFinal[a].set[i].PencapaianLahirMatiTL;
                  pencapaianKNTL = dataFinal[a].set[i].PencapaianKNLengkapTL;
                  // console.log(a, dataFinal[a].set[i].SasaranBayiTL);
                  sasaran = dataFinal[a].set[i].SasaranBayiTL;
                }
              }
              series2.push(lahirHidupBulan);
              series3.push(lahirMatiBulan);
              series1.push(sasaran);
              series4.push(pencapaianKNTL);
              category.push(dataFinal[a].Puskesmas);
              // console.log(series, series2);
            }
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
            {
              name: "Pencapaian KN Lengkap",
              type: "column",
              data: series4,
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
          <CardHeader
            title="KIA"
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
          {/* <Button
            variant="outlined"
            onClick={this.handleChangeQuarter}
            style={{ justifyContent: "center" }}
            sx={{ margin: 1 }}
          >
            Grafik Quarter
          </Button> */}
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
