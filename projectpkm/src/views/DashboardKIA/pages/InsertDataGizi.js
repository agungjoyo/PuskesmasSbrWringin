import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import {
  addDataCocGizi,
  addFinalDataCocGizi,
} from "views/store/actions/dataCocGiziAction";
import _ from "lodash";
// components
import Page from "../components/Page";
import { Navigate } from "react-router";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { DataCocEditGizi } from "views/store/actions/dataCocGiziAction";
//import { initial } from "lodash";

class InsertDataGizi extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      JumlahBalitaKMS: "",
      JumlahBadutaLess23Bln: "",
      JmlBalitaLess2359Bln: "",
      JmlBalitaLess59Bln: "",
      JmlBalitaNaikBB: "",
      JmlFe3: "",
      JmlFe1: "",
      JmlVitAMr: "",
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
    const { dataCocGizi } = this.props;
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
        const year = [];
        const yearTemp = new Date().getFullYear();
        for (let c = 0; c < 5; c++) {
          year.push("" + (yearTemp + 1));
        }
        console.log(data, dateSplit, this.state);
        console.log(this.state.files[0].path);
        const yearFix = this.state.files[0].path;
        const yearsplit = yearFix.split("");
        console.log(yearsplit);
        const yearTemp1 = _.filter(yearsplit, () => {
          const temp = [];
          for (let i = 0; i < yearsplit.length; i++) {
            if (
              yearsplit[i] !== 1 ||
              yearsplit[i] !== 2 ||
              yearsplit[i] !== 3 ||
              yearsplit[i] !== 4 ||
              yearsplit[i] !== 5 ||
              yearsplit[i] !== 6 ||
              yearsplit[i] !== 7 ||
              yearsplit[i] !== 8 ||
              yearsplit[i] !== 9 ||
              yearsplit[i] !== 0
            ) {
              console.log("true");
              temp.push(yearsplit[i]);
            } else {
              console.log("false");
            }
          }
        });
        console.log(yearTemp1);

        // for (var i = 0; i < 6; i++) {
        for (let c = 4; c < 10; c++) {
          if (data[89][c] == undefined) {
            this.setState({
              Tahun: yearFix,
              Bulan: dateSplit[3],
              Puskesmas: data[3][c],
              JumlahBalitaKMS: data[13][c],
              JumlahBadutaLess23Bln: data[16][c],
              JmlBalitaLess2359Bln: data[19][c],
              JmlBalitaLess59Bln: data[22][c],
              JmlBalitaNaikBB: data[25][c],
              JmlFe1: data[138][c],
              JmlFe3: data[139][c],
              JmlVitAMr: 0,
            });
          } else {
            this.setState({
              Tahun: yearFix,
              Bulan: dateSplit[3],
              Puskesmas: data[3][c],
              JumlahBalitaKMS: data[13][c],
              JumlahBadutaLess23Bln: data[16][c],
              JmlBalitaLess2359Bln: data[19][c],
              JmlBalitaLess59Bln: data[22][c],
              JmlBalitaNaikBB: data[25][c],
              JmlFe1: data[138][c],
              JmlFe3: data[139][c],
              JmlVitAMr: data[89][c],
            });
          }

          const dataCocFinal = _.filter(dataCocGizi, {
            Puskesmas: this.state.Puskesmas,
          });
          const dataCocCompare = _.filter(dataCocFinal, {
            Bulan: this.state.Bulan,
          });
          console.log(dataCocCompare);
          if (dataCocCompare.length == 1) {
            this.setState({ isDuplicate: true });
            console.log(this.state.isDuplicate);
            if (
              confirm(
                "Apakah Anda Ingin Merubah Data " +
                  this.state.Puskesmas +
                  " Pada " +
                  this.state.Bulan +
                  " " +
                  this.state.Tahun +
                  "?"
              ) == true
            ) {
              console.log("True");
              const { files, isDuplicate, ...finalData } = this.state;
              const finalDataCoc = {
                Tahun: this.state.Tahun,
                Bulan: this.state.Bulan,
                Puskesmas: this.state.Puskesmas,
                JumlahBalitaKMS: this.state.JumlahBalitaKMS,
                JumlahBadutaLess23Bln: this.state.JumlahBadutaLess23Bln,
                JmlBalitaLess2359Bln: this.state.JmlBalitaLess2359Bln,
                JmlBalitaLess59Bln: this.state.JmlBalitaLess59Bln,
                JmlBalitaNaikBB: this.state.JmlBalitaNaikBB,
                JmlFe3: this.state.JmlFe3,
                JmlFe1: this.state.JmlFe1,
              };

              console.log(finalDataCoc.Bulan);
              this.props.DataCocEditGizi(dataCocCompare[0].id, finalDataCoc);

              console.log(finalData, dataCocCompare[0].id);
              console.log(files, isDuplicate);
              this.props.DataCocEditGizi(dataCocCompare[0].id, finalData);
              // if (dataVitA.length == undefined){
              //   this.setState({JmlVitAMr = 0})
              // }
            } else {
              window.alert("Anda Telah Membatalkan Pengubahan Data");
            }
          } else {
            this.setState({ isDuplicate: false });
            console.log(this.state.isDuplicate);
            window.alert(
              "Entry Success in " +
                this.state.Bulan +
                " " +
                this.state.Tahun +
                " for " +
                this.state.Puskesmas
            );
            const { files, ...finalData } = this.state;
            console.log(files);

            const finalDataCoc = {
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
              JumlahBalitaKMS: this.state.JumlahBalitaKMS,
              JumlahBadutaLess23Bln: this.state.JumlahBadutaLess23Bln,
              JmlBalitaLess2359Bln: this.state.JmlBalitaLess2359Bln,
              JmlBalitaLess59Bln: this.state.JmlBalitaLess59Bln,
              JmlBalitaNaikBB: this.state.JmlBalitaNaikBB,
              JmlFe3: this.state.JmlFe3,
              JmlFe1: this.state.JmlFe1,
              JmlVitAMr: this.state.JmlVitAMr,
            };
            //console.log(finalDataCoc);

            this.props.addDataCocGizi(finalDataCoc);
          }
        }
        return <Navigate to="./InsertDataGizi" />;
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
      <Page title="Dashboard | Gizi">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4"> Insert Data gizi</Typography>
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
    addDataCocGizi: (dataCocGizi) => dispatch(addDataCocGizi(dataCocGizi)),
    addFinalDataCocGizi: (finalDataCoc) =>
      dispatch(addFinalDataCocGizi(finalDataCoc)),
    DataCocEditGizi: (dataCocGizi, id) =>
      dispatch(DataCocEditGizi(dataCocGizi, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCocGizi: state.firestore.ordered.Gizi,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Gizi" }])
)(InsertDataGizi);
