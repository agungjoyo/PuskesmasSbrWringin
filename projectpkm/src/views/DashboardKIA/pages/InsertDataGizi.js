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
      JmlSPDK: "",
      JmlPDK: "",
      JmlTNM: "",
      JmlTG: "",
      JmlGibur: "",
      JmlGirang: "",
      JmlNML: "",
      JmlRGzLbh: "",
      JmlGzLbh: "",
      JmlObes: "",
      JmlBBSK: "",
      JmlBBK: "",
      JmlBBN: "",
      JmlBBL: "",
      JmlBMLA: "",
      JmlBMKEK: "",
      JmlPMTKEK: "",
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
        const finalTemp = temp[0] + temp[1] + temp[2] + temp[3];

        // for (var i = 0; i < 6; i++) {
        for (let d = 4; d < 10; d++) {
          if (data[89][d] == undefined) {
            this.setState({
              Tahun: finalTemp,
              Bulan: dateSplit[3],
              Puskesmas: data[3][d],
              JumlahBalitaKMS: data[13][d],
              JumlahBadutaLess23Bln: data[16][d],
              JmlBalitaLess2359Bln: data[19][d],
              JmlBalitaLess59Bln: data[22][d],
              JmlBalitaNaikBB: data[25][d],
              JmlFe1: data[138][d],
              JmlFe3: data[139][d],
              JmlVitAMr: 0,
              JmlSPDK: data[55][d],
              JmlPDK: data[58][d],
              JmlTNM: data[61][d],
              JmlTG: data[64][d],
              JmlGibur: data[67][d],
              JmlGirang: data[70][d],
              JmlNML: data[73][d],
              JmlRGzLbh: data[76][d],
              JmlGzLbh: data[79][d],
              JmlObes: data[82][d],
              JmlBBSK: data[43][d],
              JmlBBK: data[46][d],
              JmlBBN: data[49][d],
              JmlBBL: data[52][d],
              JmlBMLA: data[142][d],
              JmlBMKEK: data[143][d],
              JmlPMTKEK: data[144][d],
            });
          } else {
            this.setState(
              {
                Tahun: finalTemp,
                Bulan: dateSplit[3],
                Puskesmas: data[3][d],
                JumlahBalitaKMS: data[13][d],
                JumlahBadutaLess23Bln: data[16][d],
                JmlBalitaLess2359Bln: data[19][d],
                JmlBalitaLess59Bln: data[22][d],
                JmlBalitaNaikBB: data[25][d],
                JmlFe1: data[138][d],
                JmlFe3: data[139][d],
                JmlVitAMr: data[89][d],
                JmlSPDK: data[55][d],
                JmlPDK: data[58][d],
                JmlTNM: data[61][d],
                JmlTG: data[64][d],
                JmlGibur: data[67][d],
                JmlGirang: data[70][d],
                JmlNML: data[73][d],
                JmlRGzLbh: data[76][d],
                JmlGzLbh: data[79][d],
                JmlObes: data[82][d],
                JmlBBSK: data[43][d],
                JmlBBK: data[46][d],
                JmlBBN: data[49][d],
                JmlBBL: data[52][d],
                JmlBMLA: data[142][d],
                JmlBMKEK: data[143][d],
                JmlPMTKEK: data[144][d],
              },
              () => {
                const dataCheckGizi = [
                  this.state.Bulan,
                  this.state.Puskesmas,
                  this.state.JumlahBalitaKMS,
                  this.state.JumlahBadutaLess23Bln,
                  this.state.JmlBalitaLess2359Bln,
                  this.state.JmlBalitaLess59Bln,
                  this.state.JmlBalitaNaikBB,
                  this.state.JmlSPDK,
                  this.state.JmlPDK,
                  this.state.JmlTNM,
                  this.state.JmlTG,
                  this.state.JmlGibur,
                  this.state.JmlGirang,
                  this.state.JmlNML,
                  this.state.JmlRGzLbh,
                  this.state.JmlGzLbh,
                  this.state.JmlObes,
                  this.state.JmlBBSK,
                  this.state.JmlBBK,
                  this.state.JmlBBN,
                  this.state.JmlBBL,
                  this.state.JmlBMLA,
                  this.state.JmlBMKEK,
                  this.state.JmlPMTKEK,
                ];

                const dataCheckName = [
                  "Bulan",
                  "Puskesmas",
                  "Jumlah Balita KMS",
                  "Jumlah baduta (0-23 bln) yang ditimbang",
                  "Jumlah balita (24-59 bln) yang ditimbang",
                  "Jumlah balita (0-59 bln) yang ditimbang",
                  "Jumlah Balita Naik BB",
                  "Jumlah S.PDK",
                  "Jumlah PDK",
                  "Jumlah TNM",
                  "Jumlah TG",
                  "Jumlah Gibur",
                  "Jumlah Girang",
                  "Jumlah NML",
                  "Jumlah RGzLbh",
                  "Jumlah GzLbh",
                  "Jumlah Obes",
                  "Jumlah BBSK",
                  "Jumlah BBK",
                  "Jumlah BBN",
                  "Jumlah BBL",
                  "Jumlah BMLA",
                  "Jumlah BMKEK",
                  "Jumlah PMTKEK",
                ];
                const whereEmpty = {
                  Desa: [],
                  Where: [],
                  Empty: "false",
                };
                for (let check = 0; check < dataCheckGizi.length; check++) {
                  if (dataCheckGizi[check] == undefined) {
                    whereEmpty.Desa.push(dataCheckGizi[2]);
                    whereEmpty.Where.push(dataCheckName[check]);
                    whereEmpty.Empty = "true";
                  }
                }
                this.setState(
                  {
                    whereEmpty: whereEmpty,
                  },
                  () => {
                    const dataCocFinal = _.filter(dataCocGizi, {
                      Puskesmas: this.state.Puskesmas,
                    });
                    const dataCocCompare = _.filter(dataCocFinal, {
                      Bulan: this.state.Bulan,
                    });
                    console.log(dataCocCompare);
                    if (this.state.whereEmpty.Empty == "true") {
                      window.alert(
                        "Data Kurang Lengkap di " +
                          this.state.whereEmpty.Where +
                          " Pada Desa " +
                          this.state.whereEmpty.Desa
                      );
                    } else {
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
                          // console.log("True");
                          const { files, isDuplicate, ...finalData } =
                            this.state;
                          const finalDataCoc = {
                            Tahun: this.state.Tahun,
                            Bulan: this.state.Bulan,
                            Puskesmas: this.state.Puskesmas,
                            JumlahBalitaKMS: this.state.JumlahBalitaKMS,
                            JumlahBadutaLess23Bln:
                              this.state.JumlahBadutaLess23Bln,
                            JmlBalitaLess2359Bln:
                              this.state.JmlBalitaLess2359Bln,
                            JmlBalitaLess59Bln: this.state.JmlBalitaLess59Bln,
                            JmlBalitaNaikBB: this.state.JmlBalitaNaikBB,
                            JmlFe3: this.state.JmlFe3,
                            JmlFe1: this.state.JmlFe1,
                            JmlVitAMr: this.state.JmlVitAMr,
                            JmlSPDK: this.state.JmlSPDK,
                            JmlPDK: this.state.JmlPDK,
                            JmlTNM: this.state.JmlTNM,
                            JmlTG: this.state.JmlTG,
                            JmlGibur: this.state.JmlGibur,
                            JmlGirang: this.state.JmlGirang,
                            JmlNML: this.state.JmlNML,
                            JmlRGzLbh: this.state.JmlRGzLbh,
                            JmlGzLbh: this.state.JmlGzLbh,
                            JmlObes: this.state.JmlObes,
                            JmlBBSK: this.state.JmlBBSK,
                            JmlBBK: this.state.JmlBBK,
                            JmlBBK: this.state.JmlBBK,
                            JmlBBN: this.state.JmlBBN,
                            JmlBBL: this.state.JmlBBL,
                            JmlBMKEK: this.state.JmlBMKEK,
                            JmlPMTKEK: this.state.JmlPMTKEK,
                          };

                          // console.log(finalDataCoc.Bulan);
                          this.props.DataCocEditGizi(
                            dataCocCompare[0].id,
                            finalDataCoc
                          );
                          console.log(finalData, dataCocCompare[0].id);
                        } else {
                          window.alert(
                            "Anda Telah Membatalkan Pengubahan Data"
                          );
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
                        const finalDataCoc = {
                          Tahun: this.state.Tahun,
                          Bulan: this.state.Bulan,
                          Puskesmas: this.state.Puskesmas,
                          JumlahBalitaKMS: this.state.JumlahBalitaKMS,
                          JumlahBadutaLess23Bln:
                            this.state.JumlahBadutaLess23Bln,
                          JmlBalitaLess2359Bln: this.state.JmlBalitaLess2359Bln,
                          JmlBalitaLess59Bln: this.state.JmlBalitaLess59Bln,
                          JmlBalitaNaikBB: this.state.JmlBalitaNaikBB,
                          JmlFe3: this.state.JmlFe3,
                          JmlFe1: this.state.JmlFe1,
                          JmlVitAMr: this.state.JmlVitAMr,
                          JmlSPDK: this.state.JmlSPDK,
                          JmlPDK: this.state.JmlPDK,
                          JmlTNM: this.state.JmlTNM,
                          JmlTG: this.state.JmlTG,
                          JmlGibur: this.state.JmlGibur,
                          JmlGirang: this.state.JmlGirang,
                          JmlNML: this.state.JmlNML,
                          JmlRGzLbh: this.state.JmlRGzLbh,
                          JmlGzLbh: this.state.JmlGzLbh,
                          JmlObes: this.state.JmlObes,
                          JmlBBSK: this.state.JmlBBSK,
                          JmlBBK: this.state.JmlBBK,
                          JmlBBN: this.state.JmlBBN,
                          JmlBBL: this.state.JmlBBL,
                          JmlBMLA: this.state.JmlBMLA,
                          JmlBMKEK: this.state.JmlBMKEK,
                          JmlPMTKEK: this.state.JmlPMTKEK,
                        };
                        // console.log(finalDataCoc);

                        this.props.addDataCocGizi(finalDataCoc);
                      }
                    }
                    return <Navigate to="./InsertDataGizi" />;
                  }
                );
              }
            );
          }
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
