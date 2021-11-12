import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import csv from "csv";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { addDataCoc } from "views/store/actions/datacocAction";
// components
import Page from "../components/Page";
// import {
//   AppTasks,
//   AppNewUsers,
//   AppBugReports,
//   AppItemOrders,
//   AppNewsUpdate,
//   AppWeeklySales,
//   AppOrderTimeline,
//  AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
// AppCurrentSubject,
// AppConversionRates
// } from "../components/_dashboard/app";

// ----------------------------------------------------------------------

class InsertData extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      SasaranKelahiranHidupLK: "",
      SasaranKelahiranHidupPR: "",
      SasaranKelahiranHidupTL: "",
      SasaranBayiRistiLK: "",
      SasaranBayiRistiPR: "",
      SasaranBayiRistiTL: "",
      SasaranBayiLK: "",
      SasaranBayiPR: "",
      SasaranBayiTL: "",
      PencapaianLahirHidupLK: "",
      PencapaianLahirHidupPR: "",
      PencapaianLahirHidupTL: "",
      PencapaianLahirMatiLK: "",
      PencapaianLahirMatiPR: "",
      PencapaianLahirMatiTL: "",
      PencapaianKNPertamaLK: "",
      PencapaianKNPertamaPR: "",
      PencapaianKNPertamaTL: "",
      PencapaianKNKeduaLK: "",
      PencapaianKNKeduaPR: "",
      PencapaianKNKeduaTL: "",
      PencapaianKNLengkapLK: "",
      PencapaianKNLengkapPR: "",
      PencapaianKNLengkapTL: "",
      NeonatalKompLK: "",
      NeonatalKompPR: "",
      NeonatalKompTL: "",
      KunjunganBayiParipurnaLK: "",
      KunjunganBayiParipurnaPR: "",
      KunjunganBayiParipurnaTL: "",
    };
  }
  round(value, exp) {
    if (typeof exp === "undefined" || +exp === 0) return Math.round(value);
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) return NaN;
    // Shift
    value = value.toString().split("e");
    value = Math.round + value[0] + "e" + (value[1] ? +value[1] + exp : exp);
    // Shift back
    value = value.toString().split("e");
    return +value[0] + "e" + (value[1] ? +value[1] - exp : -exp);
  }

  readExcell = (event) => {
    this.setState({ files: event });
    const file = this.state.files[0];
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        resolve(data);
        const tahun = data[2][0];
        const dateSplit = tahun.split(" ");
        for (var i = 7; i < 13; i++) {
          const SasaranBayiRistiLKRound = this.round(data[i][5]);
          const SasaranBayiRistiPRRound = this.round(data[i][6]);
          const SasaranBayiRistiTLRound = this.round(data[i][7]);
          this.setState({
            Tahun: dateSplit[3],
            Bulan: dateSplit[1],
            Puskesmas: data[i][1],
            SasaranKelahiranHidupLK: data[i][2],
            SasaranKelahiranHidupPR: data[i][3],
            SasaranKelahiranHidupTL: data[i][4],
            SasaranBayiRistiLK: SasaranBayiRistiLKRound,
            SasaranBayiRistiPR: SasaranBayiRistiPRRound,
            SasaranBayiRistiTL: SasaranBayiRistiTLRound,
            SasaranBayiLK: data[i][8],
            SasaranBayiPR: data[i][9],
            SasaranBayiTL: data[i][10],
            PencapaianLahirHidupLK: data[i][14],
            PencapaianLahirHidupPR: data[i][15],
            PencapaianLahirHidupTL: data[i][16],
            PencapaianLahirMatiLK: data[i][27],
            PencapaianLahirMatiPR: data[i][28],
            PencapaianLahirMatiTL: data[i][29],
            PencapaianKNPertamaLK: data[i][40],
            PencapaianKNPertamaPR: data[i][41],
            PencapaianKNPertamaTL: data[i][42],
            PencapaianKNKeduaLK: data[i][53],
            PencapaianKNKeduaPR: data[i][54],
            PencapaianKNKeduaTL: data[i][55],
            PencapaianKNLengkapLK: data[i][67],
            PencapaianKNLengkapPR: data[i][68],
            PencapaianKNLengkapTL: data[i][69],
            NeonatalKompLK: data[i][80],
            NeonatalKompPR: data[i][81],
            NeonatalKompTL: data[i][82],
            KunjunganBayiParipurnaLK: data[i][92],
            KunjunganBayiParipurnaPR: data[i][93],
            KunjunganBayiParipurnaTL: data[i][94],
          });
          //   const name = data[i][0];
          //   const phoneNumber = data[i][1];
          //   const address = data[i][2];
          //   const classType = data[i][3];
          //   const newUser = {
          //     name: name,
          //     phoneNumber: phoneNumber,
          //     address: address,
          //     class: classType,
          const { files, ...finalData } = this.state;
          console.log(files);
          this.props.addDataCoc(finalData);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
    });
  };
  onDrop(files) {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse({ delimiter: ";" }, reader.result, (err, data) => {
        const tahun = data[2][0];
        const dateSplit = tahun.split(" ");
        this.setState({
          Tahun: dateSplit[3],
          Bulan: dateSplit[1],
        });
        // console.log(dateSplit);
        // var userList = [];
        console.log(data);
        for (var i = 7; i < 13; i++) {
          this.setState({
            Puskesmas: data[i][2],
            SasaranKelahiranHidupLK: data[i][4],
            SasaranKelahiranHidupPR: data[i][6],
            SasaranKelahiranHidupTL: data[i][8],
            SasaranBayiRistiLK: data[i][10],
            SasaranBayiRistiPR: data[i][12],
            SasaranBayiRistiTL: data[i][14],
            SasaranBayiLK: data[i][16],
            SasaranBayiPR: data[i][18],
            SasaranBayiTL: data[i][20],
            PencapaianLahirHidupLK: data[i][28],
            PencapaianLahirHidupPR: data[i][30],
            PencapaianLahirHidupTL: data[i][32],
            PencapaianLahirMatiLK: data[i][54],
            PencapaianLahirMatiPR: data[i][56],
            PencapaianLahirMatiTL: data[i][58],
            PencapaianKNPertamaLK: data[i][80],
            PencapaianKNPertamaPR: data[i][82],
            PencapaianKNPertamaTL: data[i][84],
            PencapaianKNKeduaLK: data[i][106],
            PencapaianKNKeduaPR: data[i][108],
            PencapaianKNKeduaTL: data[i][110],
            PencapaianKNLengkapLK: data[i][132],
            PencapaianKNLengkapPR: data[i][134],
            PencapaianKNLengkapTL: data[i][136],
            NeonatalKompLK: data[i][158],
            NeonatalKompPR: data[i][160],
            NeonatalKompTL: data[i][162],
            KunjunganBayiParipurnaLK: data[i][184],
            KunjunganBayiParipurnaPR: data[i][186],
            KunjunganBayiParipurnaTL: data[i][188],
          });
          //   const name = data[i][0];
          //   const phoneNumber = data[i][1];
          //   const address = data[i][2];
          //   const classType = data[i][3];
          //   const newUser = {
          //     name: name,
          //     phoneNumber: phoneNumber,
          //     address: address,
          //     class: classType,
        }
        //   userList.push(newUser);
        //   console.log(newUser);
        // }
      });
    };
    reader.readAsBinaryString(file);
    // this.props.addDataCoc(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Insert Data</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                align="center"
                style={{
                  padding: "30px 30px 30px 30px",
                  boxShadow: "3px 3px 10px #9E9E9E",
                }}
              >
                <Dropzone onDrop={this.readExcell.bind(this)}>
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="container"
                      style={{
                        border: "1px dashed black",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{ height: 50 }}
                        {...getRootProps({ className: "dropzone" })}
                      >
                        <input {...getInputProps()} />
                        <p style={{ margin: 30 }}>
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <br />
                <br />
                <br />
                <h2>
                  Drop your
                  <font color="#00A4FF"> CSV</font>
                  <br />
                  file here.
                </h2>
              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid> */}
            {/* <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisits />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <AppTrafficBySite />
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <AppTasks />
            </Grid> */}
          </Grid>
        </Container>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDataCoc: (dataCoc) => dispatch(addDataCoc(dataCoc)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCoc: state.dataCoc,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertData);
