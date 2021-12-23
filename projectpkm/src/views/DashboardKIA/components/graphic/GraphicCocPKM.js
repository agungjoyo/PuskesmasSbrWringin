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

class GraphicCocPKM extends Component {
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
      stroke: { width: [3, 3, 3, 3, 3, 3, 3, 3, 3] },
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
          speed: 300,
          animateGradually: {
            enabled: true,
            delay: 300,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "45%",
          borderRadius: 8,
          dataLabels: { position: "top" },
        },
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#663F59",
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
        ],
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
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
        name: "Sasaran",
        type: "column",
        data: [],
      },
      {
        name: "Sasaran Bayi Risti",
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
        name: "KN Pertama",
        type: "column",
        data: [],
      },
      {
        name: "KN Kedua",
        type: "column",
        data: [],
      },
      {
        name: "KN Lengkap",
        type: "column",
        data: [],
      },
      {
        name: "KN Komplikasi",
        type: "column",
        data: [],
      },
      {
        name: "Kunjungan Bayi Paripurna",
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
    this.setState(
      {
        monthIndex: [],
        desaIndex: [],
        yearIndex: "",
        desa: desa,
        series: [
          {
            name: "Sasaran",
            type: "column",
            data: [],
          },
          {
            name: "Sasaran Bayi Risti",
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
            name: "KN Pertama",
            type: "column",
            data: [],
          },
          {
            name: "KN Kedua",
            type: "column",
            data: [],
          },
          {
            name: "KN Lengkap",
            type: "column",
            data: [],
          },
          {
            name: "KN Komplikasi",
            type: "column",
            data: [],
          },
          {
            name: "Kunjungan Bayi Paripurna",
            type: "column",
            data: [],
          },
        ],
        options: {
          ...this.state.options,
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
    console.log(this.state);
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
    this.setState({
      yearIndex: "",
      year: yearList,
      series: [
        {
          name: "Sasaran",
          type: "column",
          data: [],
        },
        {
          name: "Sasaran Bayi Risti",
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
          name: "KN Pertama",
          type: "column",
          data: [],
        },
        {
          name: "KN Kedua",
          type: "column",
          data: [],
        },
        {
          name: "KN Lengkap",
          type: "column",
          data: [],
        },
        {
          name: "KN Komplikasi",
          type: "column",
          data: [],
        },
        {
          name: "Kunjungan Bayi Paripurna",
          type: "column",
          data: [],
        },
      ],
      options: {
        ...this.state.options,
        dataLabels: {
          ...this.state.options.dataLabels,
          offsetY: -2,
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
    });
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
  tahunGraphic = () => {
    return (
      <div>
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={this.state.series}
            options={this.state.options}
            height={1500}
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
        let category = [];
        let sasaran = 0;
        let sasaranBayiRisti = 0;
        let lahirHidupBulan = 0;
        let lahirMatiBulan = 0;
        let KN1Bulan = 0;
        let KN2Bulan = 0;
        let KNlengkapBulan = 0;
        let KNkomplikasiBulan = 0;
        let KunjunganBayiParipurnaBulan = 0;
        for (let a = 0; a < dataFinal.length; a++) {
          for (let b = 0; b < this.state.desaIndex.length; b++) {
            if (dataFinal[a].Puskesmas == this.state.desaIndex[b]) {
              for (let i = 0; i < dataFinal[i].set.length; i++) {
                for (let c = 0; c < this.state.monthIndex.length; c++) {
                  if (
                    this.state.monthIndex[c]?.toLowerCase() ===
                      dataFinal[a].set[i].Bulan.toLowerCase() &&
                    this.state.yearIndex === dataFinal[a].set[i].Tahun
                  ) {
                    sasaran = dataFinal[a].set[i].SasaranBayiTL;
                    sasaranBayiRisti = dataFinal[a].set[i].SasaranBayiRistiTL;
                    lahirHidupBulan =
                      lahirHidupBulan +
                      dataFinal[a].set[c].PencapaianLahirHidupTL;
                    lahirMatiBulan =
                      lahirMatiBulan +
                      dataFinal[a].set[c].PencapaianLahirMatiTL;
                    KN1Bulan =
                      KN1Bulan + dataFinal[a].set[c].PencapaianKNPertamaTL;
                    KN2Bulan =
                      KN2Bulan + dataFinal[a].set[c].PencapaianKNKeduaTL;
                    KNlengkapBulan =
                      KNlengkapBulan +
                      dataFinal[a].set[c].PencapaianKNLengkapTL;
                    KNkomplikasiBulan =
                      KNkomplikasiBulan +
                      dataFinal[a].set[c].PencapaianKNLengkapTL;
                    KunjunganBayiParipurnaBulan =
                      KunjunganBayiParipurnaBulan +
                      dataFinal[a].set[c].KunjunganBayiParipurnaTL;
                  }
                }
              }
              series1.push(sasaran);
              series2.push(sasaranBayiRisti);
              series3.push(lahirHidupBulan);
              series4.push(lahirMatiBulan);
              series5.push(KN1Bulan);
              series6.push(KN2Bulan);
              series7.push(KNlengkapBulan);
              series8.push(KNkomplikasiBulan);
              series9.push(KunjunganBayiParipurnaBulan);
              category.push(dataFinal[a].Puskesmas);
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
              name: "Sasaran Bayi Risti",
              type: "column",
              data: series2,
            },
            {
              name: "Lahir Hidup",
              type: "column",
              data: series3,
            },
            {
              name: "Lahir Mati",
              type: "column",
              data: series4,
            },
            {
              name: "KN Pertama",
              type: "column",
              data: series5,
            },
            {
              name: "KN Kedua",
              type: "column",
              data: series6,
            },
            {
              name: "KN Lengkap",
              type: "column",
              data: series7,
            },
            {
              name: "KN Komplikasi",
              type: "column",
              data: series8,
            },
            {
              name: "Kunjungan Bayi Paripurna",
              type: "column",
              data: series9,
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
        let category = [];
        for (let a = 0; a < dataFinal.length; a++) {
          let sasaran = 0;
          let sasaranBayiRisti = 0;
          let lahirHidupYear = 0;
          let lahirMatiYear = 0;
          let KN1Year = 0;
          let KN2Year = 0;
          let KNlengkapYear = 0;
          let KNkomplikasiYear = 0;
          let KunjunganBayiParipurnaYear = 0;
          if (dataFinal[a].Puskesmas == desa[a]) {
            for (let i = 0; i < dataFinal[i].set.length; i++) {
              if (
                this.state.yearIndex.toLowerCase() ===
                dataFinal[a].set[i].Tahun.toLowerCase()
              ) {
                sasaran = dataFinal[a].set[i].SasaranBayiTL;
                sasaranBayiRisti = dataFinal[a].set[i].SasaranBayiRistiTL;
                lahirHidupYear =
                  lahirHidupYear + dataFinal[a].set[i].PencapaianLahirHidupTL;
                lahirMatiYear =
                  lahirMatiYear + dataFinal[a].set[i].PencapaianLahirMatiTL;
                KN1Year = KN1Year + dataFinal[a].set[i].PencapaianKNPertamaTL;
                KN2Year = KN2Year + dataFinal[a].set[i].PencapaianKNKeduaTL;
                KNlengkapYear =
                  KNlengkapYear + dataFinal[a].set[i].PencapaianKNLengkapTL;
                KNkomplikasiYear =
                  KNkomplikasiYear + dataFinal[a].set[i].PencapaianKNLengkapTL;
                KunjunganBayiParipurnaYear =
                  KunjunganBayiParipurnaYear +
                  dataFinal[a].set[i].KunjunganBayiParipurnaTL;
              }
            }
            series1.push(sasaran);
            series2.push(sasaranBayiRisti);
            series3.push(lahirHidupYear);
            series4.push(lahirMatiYear);
            series5.push(KN1Year);
            series6.push(KN2Year);
            series7.push(KNlengkapYear);
            series8.push(KNkomplikasiYear);
            series9.push(KunjunganBayiParipurnaYear);
            category.push(dataFinal[a].Puskesmas);
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
              name: "Sasaran Bayi Risti",
              type: "column",
              data: series2,
            },
            {
              name: "Lahir Hidup",
              type: "column",
              data: series3,
            },
            {
              name: "Lahir Mati",
              type: "column",
              data: series4,
            },
            {
              name: "KN Pertama",
              type: "column",
              data: series5,
            },
            {
              name: "KN Kedua",
              type: "column",
              data: series6,
            },
            {
              name: "KN Lengkap",
              type: "column",
              data: series7,
            },
            {
              name: "KN Komplikasi",
              type: "column",
              data: series8,
            },
            {
              name: "Kunjungan Bayi Paripurna",
              type: "column",
              data: series9,
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
        console.log(this.state);
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
)(GraphicCocPKM);
