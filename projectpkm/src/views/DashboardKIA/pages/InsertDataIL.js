import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import {
  addDataCocImunLanjutan,
  DataCocEditImunisasiLanjutan,
} from "views/store/actions/datacocimunAction";
import _ from "lodash";
// components
import Page from "../components/Page";
import { Navigate } from "react-router";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//import { initial } from "lodash";

class InsertDataIL extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      SasaranBatita: "",
      DPTHBHibke4: "",
      CampakKe2: "",
      CampakRubella2: "",
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
    const { dataCocImunLanjutan } = this.props;
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
        const tahun = data[2][4];
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
        const temp = [];
        for (let i = 0; i < yearsplit.length; i++) {
          if (
            yearsplit[i] == 1 ||
            yearsplit[i] == 2 ||
            yearsplit[i] == 3 ||
            yearsplit[i] == 4 ||
            yearsplit[i] == 5 ||
            yearsplit[i] == 6 ||
            yearsplit[i] == 7 ||
            yearsplit[i] == 8 ||
            yearsplit[i] == 9 ||
            yearsplit[i] == 0
          ) {
            console.log("true");
            temp.push(yearsplit[i]);
          } else {
            console.log("false");
          }
        }
        // console.log(yearTemp1);
        const finalTemp = temp[0] + temp[1] + temp[2] + temp[3];
        const bulan = data[2][0];
        //const dateBulanSplit = bulan.split(" ");
        // if (dateBulanSplit[2] == undefined) {
        //   this.setState({
        //     Bulan: dateBulanSplit[1],
        //   });
        // } else {
        //   this.setState({
        //     Bulan: dateBulanSplit[2],
        //   });
        // }
        console.log(dateSplit);

        for (var i = 8; i < 14; i++) {
          for (let a = 0; a < dateSplit.length; a++) {
            console.log(dateSplit[a]);
            if (dateSplit[a] == year) {
              this.setState({
                Tahun: dateSplit[a],
              });
            }
          }
          //   for (let a = 0; a < dateBulanSplit.length; a++) {
          //     if (dateBulanSplit[2] == undefined) {
          //       this.setState({
          //         Bulan: dateBulanSplit[1],
          //       });
          //     } else {
          //       this.setState({
          //         Bulan: dateBulanSplit[2],
          //       });
          //     }
          //   }
          //   console.log(dateBulanSplit);
          this.setState({
            Tahun: finalTemp,
            Bulan: dateSplit[0],
            Puskesmas: data[i][2],
            SasaranBatita: data[i][5],
            DPTHBHibke4: data[i][8],
            CampakKe2: data[i][11],
            CampakRubella2: data[i][14],
          });
          const dataCocFinal = _.filter(dataCocImunLanjutan, {
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
              console.log(finalData, dataCocCompare[0].id);
              console.log(files, isDuplicate);
              this.props.DataCocEditImunisasiLanjutan(
                dataCocCompare[0].id,
                finalData
              );
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
            this.props.addDataCocImunLanjutan(finalData);
          }
        }
        return <Navigate to="./InsertDataImun" />;
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
            <Typography variant="h4">
              {" "}
              Insert Data Imunisasi Lanjutan
            </Typography>
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
    addDataCocImunLanjutan: (dataCocImunLanjutan) =>
      dispatch(addDataCocImunLanjutan(dataCocImunLanjutan)),
    DataCocEditImunisasi: (dataCocImunisasiL, id) =>
      dispatch(DataCocEditImunisasi(dataCocImunisasiL, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCocImunLanjutan: state.firestore.ordered.ImunisasiLanjutan,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "ImunisasiLanjutan" }])
)(InsertDataIL);
