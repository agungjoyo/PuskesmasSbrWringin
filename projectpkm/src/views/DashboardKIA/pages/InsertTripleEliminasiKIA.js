import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Navigate } from "react-router-dom";
import {
  addDataTripleCoc,
  DataCocTripleKIAEdit,
} from "views/store/actions/datacocAction";
import _ from "lodash";
// components
import Page from "../components/Page";

class InsertTripleEliminasiKIA extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      isDuplicate: false,
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      K1Bumil: "",
      BumilTesHIV: "",
      BumilTesIMS: "",
      BumilTesHepatitisB: "",
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
    const { TripleEliminasi } = this.props;
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
        console.log(data);
        const tahun = data[2][0];
        const dateSplit = tahun.split(" ");
        for (var i = 8; i < 14; i++) {
          this.setState(
            {
              Tahun: dateSplit[27],
              Bulan: dateSplit[17],
              Puskesmas: data[i][1],
              K1Bumil: data[i][2],
              BumilTesHIV: data[i][5],
              BumilTesIMS: data[i][20],
              BumilTesHepatitisB: data[i][23],
            },
            () => {
              console.log(this.state);
            }
          );
          const dataCocFinal = _.filter(TripleEliminasi, {
            Puskesmas: this.state.Puskesmas,
          });
          const dataCocCompare = _.filter(dataCocFinal, {
            Bulan: this.state.Bulan,
          });
          console.log(dataCocCompare);
          if (dataCocCompare.length == 1) {
            this.setState({ isDuplicate: true });
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
              const FinalData = {
                Tahun: this.state.Tahun,
                Bulan: this.state.Bulan,
                Puskesmas: this.state.Puskesmas,
                K1Bumil: this.state.K1Bumil,
                BumilTesHIV: this.state.BumilTesHIV,
                BumilTesIMS: this.state.BumilTesIMS,
                BumilTesHepatitisB: this.state.BumilTesHepatitisB,
              };
              console.log("True");
              console.log(FinalData);
              this.props.DataCocTripleKIAEdit(dataCocCompare[0].id, FinalData);
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
            const FinalData = {
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
              K1Bumil: this.state.K1Bumil,
              BumilTesHIV: this.state.BumilTesHIV,
              BumilTesIMS: this.state.BumilTesIMS,
              BumilTesHepatitisB: this.state.BumilTesHepatitisB,
            };
            console.log("True");
            console.log(FinalData);
            this.props.addDataTripleCoc(FinalData);
          }
        }
        return <Navigate to="./InsertTripleEliminasiKIA" />;
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
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Insert Data Triple Eliminasi</Typography>
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
          </Grid>
        </Container>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDataTripleCoc: (FinalData) => dispatch(addDataTripleCoc(FinalData)),
    DataCocTripleKIAEdit: (FinalData, id) =>
      dispatch(DataCocTripleKIAEdit(FinalData, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    TripleEliminasi: state.firestore.ordered.TripleEliminasi,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "TripleEliminasi" }])
)(InsertTripleEliminasiKIA);
