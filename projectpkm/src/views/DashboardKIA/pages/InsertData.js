import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import csv from "csv";
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
                <Dropzone onDrop={this.onDrop.bind(this)}>
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

export default InsertData;
