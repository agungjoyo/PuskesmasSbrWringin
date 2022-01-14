import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Navigate } from "react-router-dom";
import { addDataKB, DataKBEdit } from "views/store/actions/datacocAction";
import _ from "lodash";
// components
import Page from "../components/Page";

class InsertDataKB extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      isDuplicate: false,
      KBPascaSalin: "",
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
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
    const { KB } = this.props;
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
        const bulan = data[3][4];
        const bulanSplit = bulan.split(" ");
        for (var i = 10; i < 16; i++) {
          this.setState(
            {
              KBPascaSalin: data[i][12],
              Tahun: dateSplit[4],
              Bulan: bulanSplit[1],
              Puskesmas: data[i][1],
            },
            () => {
              console.log(this.state);
            }
          );
          const dataCocFinal = _.filter(KB, {
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
                KBPascaSalin: this.state.KBPascaSalin,
                Tahun: this.state.Tahun,
                Bulan: this.state.Bulan,
                Puskesmas: this.state.Puskesmas,
              };
              console.log("True");
              console.log(FinalData);
              this.props.DataKBEdit(dataCocCompare[0].id, FinalData);
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
              KBPascaSalin: this.state.KBPascaSalin,
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
            };
            console.log("True");
            console.log(FinalData);
            this.props.addDataKB(FinalData);
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
    addDataKB: (FinalData) => dispatch(addDataKB(FinalData)),
    DataKBEdit: (FinalData, id) => dispatch(DataKBEdit(FinalData, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    KB: state.firestore.ordered.KB,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "KB" }])
)(InsertDataKB);
