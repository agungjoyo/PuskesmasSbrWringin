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
            this.setState({
              Tahun: yearFix,
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
              let TempDataPersentaseJmlSPDK = 0;
              let TempDataPersentaseJmlPDK = 0;
              let TempDataPersentaseJmlTNM = 0;
              let TempDataPersentaseJmlTG = 0;
              let TempDataPersentaseJmlGibur = 0;
              let TempDataPersentaseJmlGirang = 0;
              let TempDataPersentaseJmlNML = 0;
              let TempDataPersentaseJmlRGzLbh = 0;
              let TempDataPersentaseJmlGzLbh = 0;
              let TempDataPersentaseJmlObes = 0;
              let TempDataPersentaseJmlBBSK = 0;
              let TempDataPersentaseJmlBBK = 0;
              let TempDataPersentaseJmlBBN = 0;
              let TempDataPersentaseJmlBBL = 0;
              let TempDataPersentaseJmlBMLA = 0;
              let TempDataPersentaseJmlBMKEK = 0;
              let TempDataPersentaseJmlPMTKEK = 0;
              if (dataCocFinal.length !== 0) {
                for (let a = 0; a < dataCocFinal.length; a++) {
                  TempDataPersentaseJmlSPDK =
                    TempDataPersentaseJmlSPDK + dataCocFinal[a].JmlSPDK;
                  TempDataPersentaseJmlPDK =
                    TempDataPersentaseJmlPDK + dataCocFinal[a].JmlPDK;
                  TempDataPersentaseJmlTNM =
                    TempDataPersentaseJmlTNM + dataCocFinal[a].JmlTNM;
                  TempDataPersentaseJmlTG =
                    TempDataPersentaseJmlTG + dataCocFinal[a].JmlTG;
                  TempDataPersentaseJmlGibur =
                    TempDataPersentaseJmlGibur + dataCocFinal[a].JmlGibur;
                  TempDataPersentaseJmlGirang =
                    TempDataPersentaseJmlGirang + dataCocFinal[a].JmlGirang;
                  TempDataPersentaseJmlNML =
                    TempDataPersentaseJmlNML + dataCocFinal[a].JmlNML;
                  TempDataPersentaseJmlRGzLbh =
                    TempDataPersentaseJmlRGzLbh + dataCocFinal[a].JmlRGzLbh;
                  TempDataPersentaseJmlGzLbh =
                    TempDataPersentaseJmlGzLbh + dataCocFinal[a].JmlGzLbh;
                  TempDataPersentaseJmlObes =
                    TempDataPersentaseJmlObes + dataCocFinal[a].JmlObes;
                  TempDataPersentaseJmlBBSK =
                    TempDataPersentaseJmlBBSK + dataCocFinal[a].JmlBBSK;
                  TempDataPersentaseJmlBBK =
                    TempDataPersentaseJmlBBK + dataCocFinal[a].JmlBBK;
                  TempDataPersentaseJmlBBN =
                    TempDataPersentaseJmlBBN + dataCocFinal[a].JmlBBN;
                  TempDataPersentaseJmlBBL =
                    TempDataPersentaseJmlBBL + dataCocFinal[a].JmlBBL;
                  TempDataPersentaseJmlBMLA =
                    TempDataPersentaseJmlBMLA + dataCocFinal[a].JmlBMLA;
                  TempDataPersentaseJmlBMKEK =
                    TempDataPersentaseJmlBMKEK + dataCocFinal[a].JmlBMKEK;
                  TempDataPersentaseJmlPMTKEK =
                    TempDataPersentaseJmlPMTKEK + dataCocFinal[a].JmlPMTKEK;
                }
                TempDataPersentaseJmlSPDK =
                  TempDataPersentaseJmlSPDK + this.state.JmlSPDK;
                TempDataPersentaseJmlPDK =
                  TempDataPersentaseJmlPDK + this.state.JmlPDK;
                TempDataPersentaseJmlTNM =
                  TempDataPersentaseJmlTNM + this.state.JmlTNM;
                TempDataPersentaseJmlTG =
                  TempDataPersentaseJmlTG + this.state.JmlTG;
                TempDataPersentaseJmlGibur =
                  TempDataPersentaseJmlGibur + this.state.JmlGibur;
                TempDataPersentaseJmlGirang =
                  TempDataPersentaseJmlGirang + this.state.JmlGirang;
                TempDataPersentaseJmlNML =
                  TempDataPersentaseJmlNML + this.state.JmlNML;
                TempDataPersentaseJmlRGzLbh =
                  TempDataPersentaseJmlRGzLbh + this.state.JmlRGzLbh;
                TempDataPersentaseJmlGzLbh =
                  TempDataPersentaseJmlGzLbh + this.state.JmlGzLbh;
                TempDataPersentaseJmlObes =
                  TempDataPersentaseJmlObes + this.state.JmlObes;
                TempDataPersentaseJmlBBSK =
                  TempDataPersentaseJmlBBSK + this.state.JmlBBSK;
                TempDataPersentaseJmlBBK =
                  TempDataPersentaseJmlBBK + this.state.JmlBBK;
                TempDataPersentaseJmlBBN =
                  TempDataPersentaseJmlBBN + this.state.JmlBBN;
                TempDataPersentaseJmlBBL =
                  TempDataPersentaseJmlBBL + this.state.JmlBBL;
                TempDataPersentaseJmlBMLA =
                  TempDataPersentaseJmlBMLA + this.state.JmlBMLA;
                TempDataPersentaseJmlBMKEK =
                  TempDataPersentaseJmlBMKEK + this.state.JmlBMKEK;
                TempDataPersentaseJmlPMTKEK =
                  TempDataPersentaseJmlPMTKEK + this.state.JmlPMTKEK;
              } else {
                TempDataPersentaseJmlSPDK =
                  TempDataPersentaseJmlSPDK + this.state.JmlSPDK;
                TempDataPersentaseJmlPDK =
                  TempDataPersentaseJmlPDK + this.state.JmlPDK;
                TempDataPersentaseJmlTNM =
                  TempDataPersentaseJmlTNM + this.state.JmlTNM;
                TempDataPersentaseJmlTG =
                  TempDataPersentaseJmlTG + this.state.JmlTG;
                TempDataPersentaseJmlGibur =
                  TempDataPersentaseJmlGibur + this.state.JmlGibur;
                TempDataPersentaseJmlGirang =
                  TempDataPersentaseJmlGirang + this.state.JmlGirang;
                TempDataPersentaseJmlNML =
                  TempDataPersentaseJmlNML + this.state.JmlNML;
                TempDataPersentaseJmlRGzLbh =
                  TempDataPersentaseJmlRGzLbh + this.state.JmlRGzLbh;
                TempDataPersentaseJmlGzLbh =
                  TempDataPersentaseJmlGzLbh + this.state.JmlGzLbh;
                TempDataPersentaseJmlObes =
                  TempDataPersentaseJmlObes + this.state.JmlObes;
                TempDataPersentaseJmlBBSK =
                  TempDataPersentaseJmlBBSK + this.state.JmlBBSK;
                TempDataPersentaseJmlBBK =
                  TempDataPersentaseJmlBBK + this.state.JmlBBK;
                TempDataPersentaseJmlBBN =
                  TempDataPersentaseJmlBBN + this.state.JmlBBN;
                TempDataPersentaseJmlBBL =
                  TempDataPersentaseJmlBBL + this.state.JmlBBL;
                TempDataPersentaseJmlBMLA =
                  TempDataPersentaseJmlBMLA + this.state.JmlBMLA;
                TempDataPersentaseJmlBMKEK =
                  TempDataPersentaseJmlBMKEK + this.state.JmlBMKEK;
                TempDataPersentaseJmlPMTKEK =
                  TempDataPersentaseJmlPMTKEK + this.state.JmlPMTKEK;
              }
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
                JmlSPDK: this.state.JmlSPDK,
                JmlSPDKPersentase:
                  (TempDataPersentaseJmlSPDK / this.state.JmlPDK +
                    this.state.JmlTNM +
                    this.state.JmlTG) *
                  100,
                JmlPDK: this.state.JmlPDK,
                JmlPDKPersentase:
                  (TempDataPersentaseJmlPDK / this.state.JmlSPDK +
                    this.state.JmlTNM +
                    this.state.JmlTG) *
                  100,
                JmlTNM: this.state.JmlTNM,
                JmlTNMPersentase:
                  (TempDataPersentaseJmlTNM / this.state.JmlSPDK +
                    this.state.JmlPDK +
                    this.state.JmlTG) *
                  100,
                JmlTG: this.state.JmlTG,
                JmlTGPersentase:
                  (TempDataPersentaseJmlTG / this.state.JmlSPDK +
                    this.state.JmlPDK +
                    this.state.JmlTNM) *
                  100,
                JmlGibur: this.state.JmlGibur,
                JmlGiburPersentase:
                  (TempDataPersentaseJmlGibur / this.state.JmlGirang +
                    this.state.JmlNML +
                    this.state.JmlRGzLbh +
                    this.state.JmlGzLbh +
                    this.state.JmlObes) *
                  100,
                JmlGirang: this.state.JmlGirang,
                JmlGirangPersentase:
                  (TempDataPersentaseJmlGirang / this.state.JmlGibur +
                    this.state.JmlNML +
                    this.state.JmlRGzLbh +
                    this.state.JmlGzLbh +
                    this.state.JmlObes) *
                  100,
                JmlNML: this.state.JmlNML,
                JmlNMLPersentase:
                  (TempDataPersentaseJmlNML / this.state.JmlGirang +
                    this.state.JmlGibur +
                    this.state.JmlRGzLbh +
                    this.state.JmlGzLbh +
                    this.state.JmlObes) *
                  100,
                JmlRGzLbh: this.state.JmlRGzLbh,
                JmlRGzLbhPersentase:
                  (TempDataPersentaseJmlRGzLbh / this.state.JmlGirang +
                    this.state.JmlNML +
                    this.state.JmlGibur +
                    this.state.JmlGzLbh +
                    this.state.JmlObes) *
                  100,
                JmlGzLbh: this.state.JmlGzLbh,
                JmlGzLbhPersentase:
                  (TempDataPersentaseJmlGzLbh / this.state.JmlGirang +
                    this.state.JmlNML +
                    this.state.JmlGibur +
                    this.state.JmlRGzLbh +
                    this.state.JmlObes) *
                  100,
                JmlObes: this.state.JmlObes,
                JmlObesPersentase:
                  (TempDataPersentaseJmlObes / this.state.JmlGirang +
                    this.state.JmlNML +
                    this.state.JmlGibur +
                    this.state.JmlGzLbh +
                    this.state.JmlRGzLbh) *
                  100,
                JmlBBSK: this.state.JmlBBSK,
                JmlBBSKPersentase:
                  (TempDataPersentaseJmlBBSK / this.state.JmlBBK +
                    this.state.JmlBBN +
                    this.state.JmlBBL) *
                  100,
                JmlBBK: this.state.JmlBBK,
                JmlBBKPersentase:
                  (TempDataPersentaseJmlBBK / this.state.JmlBBSK +
                    this.state.JmlBBN +
                    this.state.JmlBBL) *
                  100,
                JmlBBSKPersentase:
                  (TempDataPersentaseJmlBBSK / this.state.JmlBBK +
                    this.state.JmlBBN +
                    this.state.JmlBBL) *
                  100,
                JmlBBK: this.state.JmlBBK,
                JmlBBKPersentase:
                  (TempDataPersentaseJmlBBK / this.state.JmlBBSK +
                    this.state.JmlBBN +
                    this.state.JmlBBL) *
                  100,
                JmlBBN: this.state.JmlBBN,
                JmlBBNPersentase:
                  (TempDataPersentaseJmlBBN / this.state.JmlBBSK +
                    this.state.JmlBBK +
                    this.state.JmlBBL) *
                  100,
                JmlBBL: this.state.JmlBBL,
                JmlBBLPersentase:
                  (TempDataPersentaseJmlBBL / this.state.JmlBBSK +
                    this.state.JmlBBK +
                    this.state.JmlBBN) *
                  100,
                JmlBMKEK: this.state.JmlBMKEK,
                JmlBMKEKPersentase:
                  (TempDataPersentaseJmlBMKEK / this.state.JmlBMLA) * 100,
                JmlPMTKEK: this.state.JmlPMTKEK,
                JmlPMTKEKPersentase:
                  (TempDataPersentaseJmlPMTKEK / this.state.JmlBMKEK) * 100,
              };

              // console.log(finalDataCoc.Bulan);
              this.props.DataCocEditGizi(dataCocCompare[0].id, finalDataCoc);

              // console.log(finalData, dataCocCompare[0].id);
              // console.log(files, isDuplicate);
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
            let TempDataPersentaseJmlSPDK = 0;
            let TempDataPersentaseJmlPDK = 0;
            let TempDataPersentaseJmlTNM = 0;
            let TempDataPersentaseJmlTG = 0;
            let TempDataPersentaseJmlGibur = 0;
            let TempDataPersentaseJmlGirang = 0;
            let TempDataPersentaseJmlNML = 0;
            let TempDataPersentaseJmlRGzLbh = 0;
            let TempDataPersentaseJmlGzLbh = 0;
            let TempDataPersentaseJmlObes = 0;
            let TempDataPersentaseJmlBBSK = 0;
            let TempDataPersentaseJmlBBK = 0;
            let TempDataPersentaseJmlBBN = 0;
            let TempDataPersentaseJmlBBL = 0;
            let TempDataPersentaseJmlBMLA = 0;
            let TempDataPersentaseJmlBMKEK = 0;
            let TempDataPersentaseJmlPMTKEK = 0;
            if (dataCocFinal.length !== 0) {
              for (let a = 0; a < dataCocFinal.length; a++) {
                TempDataPersentaseJmlSPDK =
                  TempDataPersentaseJmlSPDK + dataCocFinal[a].JmlSPDK;
                TempDataPersentaseJmlPDK =
                  TempDataPersentaseJmlPDK + dataCocFinal[a].JmlPDK;
                TempDataPersentaseJmlTNM =
                  TempDataPersentaseJmlTNM + dataCocFinal[a].JmlTNM;
                TempDataPersentaseJmlTG =
                  TempDataPersentaseJmlTG + dataCocFinal[a].JmlTG;
                TempDataPersentaseJmlGibur =
                  TempDataPersentaseJmlGibur + dataCocFinal[a].JmlGibur;
                TempDataPersentaseJmlGirang =
                  TempDataPersentaseJmlGirang + dataCocFinal[a].JmlGirang;
                TempDataPersentaseJmlNML =
                  TempDataPersentaseJmlNML + dataCocFinal[a].JmlNML;
                TempDataPersentaseJmlRGzLbh =
                  TempDataPersentaseJmlRGzLbh + dataCocFinal[a].JmlRGzLbh;
                TempDataPersentaseJmlGzLbh =
                  TempDataPersentaseJmlGzLbh + dataCocFinal[a].JmlGzLbh;
                TempDataPersentaseJmlObes =
                  TempDataPersentaseJmlObes + dataCocFinal[a].JmlObes;
                TempDataPersentaseJmlBBSK =
                  TempDataPersentaseJmlBBSK + dataCocFinal[a].JmlBBSK;
                TempDataPersentaseJmlBBK =
                  TempDataPersentaseJmlBBK + dataCocFinal[a].JmlBBK;
                TempDataPersentaseJmlBBN =
                  TempDataPersentaseJmlBBN + dataCocFinal[a].JmlBBN;
                TempDataPersentaseJmlBBL =
                  TempDataPersentaseJmlBBL + dataCocFinal[a].JmlBBL;
                TempDataPersentaseJmlBMLA =
                  TempDataPersentaseJmlBMLA + dataCocFinal[a].JmlBMLA;
                TempDataPersentaseJmlBMKEK =
                  TempDataPersentaseJmlBMKEK + dataCocFinal[a].JmlBMKEK;
                TempDataPersentaseJmlPMTKEK =
                  TempDataPersentaseJmlPMTKEK + dataCocFinal[a].JmlPMTKEK;
              }
              TempDataPersentaseJmlSPDK =
                TempDataPersentaseJmlSPDK + this.state.JmlSPDK;
              TempDataPersentaseJmlPDK =
                TempDataPersentaseJmlPDK + this.state.JmlPDK;
              TempDataPersentaseJmlTNM =
                TempDataPersentaseJmlTNM + this.state.JmlTNM;
              TempDataPersentaseJmlTG =
                TempDataPersentaseJmlTG + this.state.JmlTG;
              TempDataPersentaseJmlGibur =
                TempDataPersentaseJmlGibur + this.state.JmlGibur;
              TempDataPersentaseJmlGirang =
                TempDataPersentaseJmlGirang + this.state.JmlGirang;
              TempDataPersentaseJmlNML =
                TempDataPersentaseJmlNML + this.state.JmlNML;
              TempDataPersentaseJmlRGzLbh =
                TempDataPersentaseJmlRGzLbh + this.state.JmlRGzLbh;
              TempDataPersentaseJmlGzLbh =
                TempDataPersentaseJmlGzLbh + this.state.JmlGzLbh;
              TempDataPersentaseJmlObes =
                TempDataPersentaseJmlObes + this.state.JmlObes;
              TempDataPersentaseJmlBBSK =
                TempDataPersentaseJmlBBSK + this.state.JmlBBSK;
              TempDataPersentaseJmlBBK =
                TempDataPersentaseJmlBBK + this.state.JmlBBK;
              TempDataPersentaseJmlBBN =
                TempDataPersentaseJmlBBN + this.state.JmlBBN;
              TempDataPersentaseJmlBBL =
                TempDataPersentaseJmlBBL + this.state.JmlBBL;
              TempDataPersentaseJmlBMLA =
                TempDataPersentaseJmlBMLA + this.state.JmlBMLA;
              TempDataPersentaseJmlBMKEK =
                TempDataPersentaseJmlBMKEK + this.state.JmlBMKEK;
              TempDataPersentaseJmlPMTKEK =
                TempDataPersentaseJmlPMTKEK + this.state.JmlPMTKEK;
            } else {
              TempDataPersentaseJmlSPDK =
                TempDataPersentaseJmlSPDK + this.state.JmlSPDK;
              TempDataPersentaseJmlPDK =
                TempDataPersentaseJmlPDK + this.state.JmlPDK;
              TempDataPersentaseJmlTNM =
                TempDataPersentaseJmlTNM + this.state.JmlTNM;
              TempDataPersentaseJmlTG =
                TempDataPersentaseJmlTG + this.state.JmlTG;
              TempDataPersentaseJmlGibur =
                TempDataPersentaseJmlGibur + this.state.JmlGibur;
              TempDataPersentaseJmlGirang =
                TempDataPersentaseJmlGirang + this.state.JmlGirang;
              TempDataPersentaseJmlNML =
                TempDataPersentaseJmlNML + this.state.JmlNML;
              TempDataPersentaseJmlRGzLbh =
                TempDataPersentaseJmlRGzLbh + this.state.JmlRGzLbh;
              TempDataPersentaseJmlGzLbh =
                TempDataPersentaseJmlGzLbh + this.state.JmlGzLbh;
              TempDataPersentaseJmlObes =
                TempDataPersentaseJmlObes + this.state.JmlObes;
              TempDataPersentaseJmlBBSK =
                TempDataPersentaseJmlBBSK + this.state.JmlBBSK;
              TempDataPersentaseJmlBBK =
                TempDataPersentaseJmlBBK + this.state.JmlBBK;
              TempDataPersentaseJmlBBN =
                TempDataPersentaseJmlBBN + this.state.JmlBBN;
              TempDataPersentaseJmlBBL =
                TempDataPersentaseJmlBBL + this.state.JmlBBL;
              TempDataPersentaseJmlBMLA =
                TempDataPersentaseJmlBMLA + this.state.JmlBMLA;
              TempDataPersentaseJmlBMKEK =
                TempDataPersentaseJmlBMKEK + this.state.JmlBMKEK;
              TempDataPersentaseJmlPMTKEK =
                TempDataPersentaseJmlPMTKEK + this.state.JmlPMTKEK;
            }
            // const { files, isDuplicate, ...finalData } = this.state;
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
              JmlSPDK: this.state.JmlSPDK,
              JmlSPDKPersentase:
                (TempDataPersentaseJmlSPDK / this.state.JmlPDK +
                  this.state.JmlTNM +
                  this.state.JmlTG) *
                100,
              JmlPDK: this.state.JmlPDK,
              JmlPDKPersentase:
                (TempDataPersentaseJmlPDK / this.state.JmlSPDK +
                  this.state.JmlTNM +
                  this.state.JmlTG) *
                100,
              JmlTNM: this.state.JmlTNM,
              JmlTNMPersentase:
                (TempDataPersentaseJmlTNM / this.state.JmlSPDK +
                  this.state.JmlPDK +
                  this.state.JmlTG) *
                100,
              JmlTG: this.state.JmlTG,
              JmlTGPersentase:
                (TempDataPersentaseJmlTG / this.state.JmlSPDK +
                  this.state.JmlPDK +
                  this.state.JmlTNM) *
                100,
              JmlGibur: this.state.JmlGibur,
              JmlGiburPersentase:
                (TempDataPersentaseJmlGibur / this.state.JmlGirang +
                  this.state.JmlNML +
                  this.state.JmlRGzLbh +
                  this.state.JmlGzLbh +
                  this.state.JmlObes) *
                100,
              JmlGirang: this.state.JmlGirang,
              JmlGirangPersentase:
                (TempDataPersentaseJmlGirang / this.state.JmlGibur +
                  this.state.JmlNML +
                  this.state.JmlRGzLbh +
                  this.state.JmlGzLbh +
                  this.state.JmlObes) *
                100,
              JmlNML: this.state.JmlNML,
              JmlNMLPersentase:
                (TempDataPersentaseJmlNML / this.state.JmlGirang +
                  this.state.JmlGibur +
                  this.state.JmlRGzLbh +
                  this.state.JmlGzLbh +
                  this.state.JmlObes) *
                100,
              JmlRGzLbh: this.state.JmlRGzLbh,
              JmlRGzLbhPersentase:
                (TempDataPersentaseJmlRGzLbh / this.state.JmlGirang +
                  this.state.JmlNML +
                  this.state.JmlGibur +
                  this.state.JmlGzLbh +
                  this.state.JmlObes) *
                100,
              JmlGzLbh: this.state.JmlGzLbh,
              JmlGzLbhPersentase:
                (TempDataPersentaseJmlGzLbh / this.state.JmlGirang +
                  this.state.JmlNML +
                  this.state.JmlGibur +
                  this.state.JmlRGzLbh +
                  this.state.JmlObes) *
                100,
              JmlObes: this.state.JmlObes,
              JmlObesPersentase:
                (TempDataPersentaseJmlObes / this.state.JmlGirang +
                  this.state.JmlNML +
                  this.state.JmlGibur +
                  this.state.JmlGzLbh +
                  this.state.JmlRGzLbh) *
                100,
              JmlBBSK: this.state.JmlBBSK,
              JmlBBSKPersentase:
                (TempDataPersentaseJmlBBSK / this.state.JmlBBK +
                  this.state.JmlBBN +
                  this.state.JmlBBL) *
                100,
              JmlBBK: this.state.JmlBBK,
              JmlBBKPersentase:
                (TempDataPersentaseJmlBBK / this.state.JmlBBSK +
                  this.state.JmlBBN +
                  this.state.JmlBBL) *
                100,
              JmlBBN: this.state.JmlBBN,
              JmlBBNPersentase:
                (TempDataPersentaseJmlBBN / this.state.JmlBBSK +
                  this.state.JmlBBK +
                  this.state.JmlBBL) *
                100,
              JmlBBL: this.state.JmlBBL,
              JmlBBLPersentase:
                (TempDataPersentaseJmlBBL / this.state.JmlBBSK +
                  this.state.JmlBBK +
                  this.state.JmlBBN) *
                100,
              JmlBMLA: this.state.JmlBMLA,
              JmlBMKEK: this.state.JmlBMKEK,
              JmlBMKEKPersentase:
                (TempDataPersentaseJmlBMKEK / this.state.JmlBMLA) * 100,
              JmlPMTKEK: this.state.JmlPMTKEK,
              JmlPMTKEKPersentase:
                (TempDataPersentaseJmlPMTKEK / this.state.JmlBMKEK) * 100,
            };
            // console.log(finalDataCoc);

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
