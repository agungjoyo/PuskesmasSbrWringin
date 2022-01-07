import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { addDataK1Coc, DataCocK1Edit } from "views/store/actions/datacocAction";
import _ from "lodash";
// components
import Page from "../components/Page";
import { Navigate } from "react-router";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
//import { DataCocEditGizi } from "views/store/actions/dataCocGiziAction";
//import { initial } from "lodash";

class InsertDataK1 extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      SasaranBumil: "",
      K4SPMBumil: "",
      Linakes: "",
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
        for (var i = 8; i < 13; i++) {
          for (let a = 0; a < dateSplit.length; a++) {
            console.log(dateSplit[a]);
            if (dateSplit[a] == year) {
              this.setState({
                Tahun: dateSplit[a],
              });
            }
          }
          this.setState({
            Tahun: dateSplit[2],
            Bulan: dateSplit[1],
            Puskesmas: data[i][1],
            files: [],
            SasaranBumil: data[i][2],
            K4SPMBumil: data[i][11],
            Linakes: data[i][36],
          });

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
                SasaranBumil: this.state.SasaranBumil,

                K4SPMBumil: this.state.K4SPMBumil,
              };

              console.log(finalDataCoc);
              this.props.DataCocEditGizi(dataCocCompare[0].id, finalDataCoc);
              this.props.DataCocK1Edit(dataCocCompare[0].id, finalData);
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
            this.props.addDataK1Coc(finalData);
            const finalDataCoc = {
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
              SasaranBumil: this.state.SasaranBumil,
              K4SPMBumil: this.state.K4SPMBumil,
            };
            console.log(finalDataCoc);
          }
        }
        return <Navigate to="./InsertDataK1" />;
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
            <Typography variant="h4"> Insert Data K1</Typography>
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
    addDataK1Coc: (dataK1Coc) => dispatch(addDataK1Coc(dataK1Coc)),
    DataCocK1Edit: (dataK1Coc, id) => dispatch(DataCocK1Edit(dataK1Coc, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCocGizi: state.firestore.ordered.K1,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "K1" }])
)(InsertDataK1);
