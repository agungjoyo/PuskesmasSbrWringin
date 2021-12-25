import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Navigate } from "react-router-dom";
import { addDataCoc } from "views/store/actions/datacocAction";
import { DataCocEdit } from "views/store/actions/datacocAction";
import _ from "lodash";
// components
import Page from "../components/Page";

class InsertData extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      isDuplicate: false,
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
    const { dataCoc } = this.props;
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
            PencapaianKNLengkapLK: data[i][66],
            PencapaianKNLengkapPR: data[i][67],
            PencapaianKNLengkapTL: data[i][68],
            NeonatalKompLK: data[i][79],
            NeonatalKompPR: data[i][80],
            NeonatalKompTL: data[i][81],
            KunjunganBayiParipurnaLK: data[i][92],
            KunjunganBayiParipurnaPR: data[i][93],
            KunjunganBayiParipurnaTL: data[i][94],
          });
          const dataCocFinal = _.filter(dataCoc, {
            Puskesmas: this.state.Puskesmas,
          });
          const dataCocCompare = _.filter(dataCocFinal, {
            Bulan: this.state.Bulan,
          });
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
              console.log("True");
              const { files, isDuplicate, ...finalData } = this.state;
              console.log(finalData, dataCocCompare[0].id);
              console.log(files, isDuplicate);
              this.props.DataCocEdit(dataCocCompare[0].id, finalData);
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
            const { files, isDuplicate, ...finalData } = this.state;
            console.log(files, isDuplicate);
            this.props.addDataCoc(finalData);
          }
        }
        return <Navigate to="./InsertData" />;
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
          </Grid>
        </Container>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDataCoc: (dataCoc) => dispatch(addDataCoc(dataCoc)),
    DataCocEdit: (dataCoc, id) => dispatch(DataCocEdit(dataCoc, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCoc: state.firestore.ordered.KIA,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "KIA" }])
)(InsertData);
