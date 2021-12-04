import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
//import csv from "csv";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { addDataCocImun } from "views/store/actions/datacocimunAction";
// components
import Page from "../components/Page";

//import { initial } from "lodash";

class InsertDataImunisasi extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Bulan: "",
      Puskesmas: "",
      SasaranBayiBaruLahir: "",
      SasaranSurvivingInfant: "",
      HBOLessOneDLM: "",
      HBOLessOneDTM: "",
      BCGLastMonth: "",
      BCGThisMonth: "",
      HBOLessOneWLM: "",
      HBOLessOneWTM: "",
      Polio1LastMonth: "",
      Polio1ThisMonth: "",
      DPTHB1LastMonth: "",
      DPTHB1ThisMonth: "",
      Polio2LastMonth: "",
      Polio2ThisMonth: "",
      DPTHB2LastMonth: "",
      DPTHB2ThisMonth: "",
      Polio3LastMonth: "",
      Polio3ThisMonth: "",
      DPTHB3LastMonth: "",
      DPTHB3ThisMonth: "",
      Polio4LastMonth: "",
      Polio4ThisMonth: "",
      IPVLastMonth: "",
      IPVThisMonth: "",
      CampakRubellaLM: "",
      CampakRubellaTM: "",
      IDLLastMonth: "",
      IDLThisMonth: "",
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

        const bulan = data[2][2];
        const dateSplit = bulan.split(" ");
        if (dateSplit[2] == undefined) {
          this.setState({
            Bulan: dateSplit[1],
          });
        } else {
          this.setState({
            Bulan: dateSplit[2],
          });
        }

        console.log(data, dateSplit, this.state);

        for (var i = 7; i < 13; i++) {
          if (dateSplit[2] == undefined) {
            this.setState({
              Bulan: dateSplit[1],
            });
          } else {
            this.setState({
              Bulan: dateSplit[2],
            });
          }
          this.setState({
            Puskesmas: data[i][1],
            SasaranBayiBaruLahir: data[i][2],
            SasaranSurvivingInfant: data[i][3],
            HBOLessOneDLM: data[i][4],
            HBOLessOneDTM: data[i][5],
            BCGLastMonth: data[i][8],
            BCGThisMonth: data[i][9],
            HBOLessOneWLM: data[i][12],
            HBOLessOneWTM: data[i][13],
            Polio1LastMonth: data[i][16],
            Polio1ThisMonth: data[i][17],
            DPTHB1LastMonth: data[i][20],
            DPTHB1ThisMonth: data[i][21],
            Polio2LastMonth: data[i][24],
            Polio2ThisMonth: data[i][25],
            DPTHB2LastMonth: data[i][28],
            DPTHB2ThisMonth: data[i][29],
            Polio3LastMonth: data[i][32],
            Polio3ThisMonth: data[i][33],
            DPTHB3LastMonth: data[i][36],
            DPTHB3ThisMonth: data[i][37],
            Polio4LastMonth: data[i][41],
            Polio4ThisMonth: data[i][42],
            IPVLastMonth: data[i][44],
            IPVThisMonth: data[i][45],
            CampakRubellaLM: data[i][48],
            CampakRubellaTM: data[i][49],
            IDLLastMonth: data[i][52],
            IDLThisMonth: data[i][53],
          });
          const { files, ...finalData } = this.state;
          console.log(files);
          this.props.addDataCocImun(finalData);
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
  render() {
    console.log(this.state);
    return (
      <Page title="Dashboard | Imunisasi">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4"> Insert Data Imunisasi</Typography>
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
                          upload file Anda disini atau klik pilih file
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <br />
                <h2>
                  Drop your
                  <font color="#00A4FF"> CSV</font>
                  <br />
                  file here.
                </h2>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDataCocImun: (dataCocImun) => dispatch(addDataCocImun(dataCocImun)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCocImun: state.dataCocImun,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertDataImunisasi);
