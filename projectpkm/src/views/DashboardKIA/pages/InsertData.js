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
  addDataCoc,
  DataCocEdit,
  addDataKIACoc,
  DataCocKIAEdit,
} from "views/store/actions/datacocAction";
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
      PencapaianLahirHidupPersentase: "",
      PencapaianLahirMatiLK: "",
      PencapaianLahirMatiPR: "",
      PencapaianLahirMatiTL: "",
      PencapaianLahirMatiPersentase: "",
      PencapaianKNPertamaLK: "",
      PencapaianKNPertamaPR: "",
      PencapaianKNPertamaTL: "",
      PencapaianKNPertamaPersentase: "",
      PencapaianKNKeduaLK: "",
      PencapaianKNKeduaPR: "",
      PencapaianKNKeduaTL: "",
      PencapaianKNKeduaPersentase: "",
      PencapaianKNLengkapLK: "",
      PencapaianKNLengkapPR: "",
      PencapaianKNLengkapTL: "",
      PencapaianKNLengkapPersentase: "",
      NeonatalKompLK: "",
      NeonatalKompPR: "",
      NeonatalKompTL: "",
      NeonatalKompPersentase: "",
      KunjunganBayiParipurnaLK: "",
      KunjunganBayiParipurnaPR: "",
      KunjunganBayiParipurnaTL: "",
      KunjunganBayiParipurnaPersentase: "",
      RumahTL: "",
      PosyanduTL: "",
      PolindesTL: "",
      PustuTL: "",
      PuskesmasTL: "",
      BPSTL: "",
      RSUTL: "",
      LuarWilayahTL: "",
      RumahTLMati: "",
      PosyanduTLMati: "",
      PolindesTLMati: "",
      PustuTLMati: "",
      PuskesmasTLMati: "",
      BPSTLMati: "",
      RSUTLMati: "",
      LuarWilayahTLMati: "",
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
    const { dataCoc, COCKIA } = this.props;
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
          this.setState(
            {
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
              // PencapaianLahirHidupPersentase: data[i][22],
              PencapaianLahirMatiLK: data[i][27],
              PencapaianLahirMatiPR: data[i][28],
              PencapaianLahirMatiTL: data[i][29],
              // PencapaianLahirMatiPersentase: data[i][35],
              PencapaianKNPertamaLK: data[i][40],
              PencapaianKNPertamaPR: data[i][41],
              PencapaianKNPertamaTL: data[i][42],
              // PencapaianKNPertamaPersentase: data[i][48],
              PencapaianKNKeduaLK: data[i][53],
              PencapaianKNKeduaPR: data[i][54],
              PencapaianKNKeduaTL: data[i][55],
              // PencapaianKNKeduaPersentase: data[i][61],
              PencapaianKNLengkapLK: data[i][66],
              PencapaianKNLengkapPR: data[i][67],
              PencapaianKNLengkapTL: data[i][68],
              // PencapaianKNLengkapPersentase: data[i][74],
              NeonatalKompLK: data[i][79],
              NeonatalKompPR: data[i][80],
              NeonatalKompTL: data[i][81],
              // NeonatalKompPersentase: data[i][90],
              KunjunganBayiParipurnaLK: data[i][92],
              KunjunganBayiParipurnaPR: data[i][93],
              KunjunganBayiParipurnaTL: data[i][94],
              // KunjunganBayiParipurnaPersentase: data[i][100],
            },
            () => {
              this.setState({
                RumahTL: data[15][16],
                PosyanduTL: data[16][16],
                PolindesTL: data[17][16],
                PustuTL: data[18][16],
                PuskesmasTL: data[19][16],
                BPSTL: data[20][16],
                RSUTL: data[21][16],
                LuarWilayahTL: data[22][16],
                RumahTLMati: data[15][29],
                PosyanduTLMati: data[16][29],
                PolindesTLMati: data[17][29],
                PustuTLMati: data[18][29],
                PuskesmasTLMati: data[19][29],
                BPSTLMati: data[20][29],
                RSUTLMati: data[21][29],
                LuarWilayahTLMati: data[22][29],
              });
            }
          );
          const dataCocFinal = _.filter(dataCoc, {
            Puskesmas: this.state.Puskesmas,
          });
          const dataCocFinalKIA = _.filter(COCKIA, {
            Puskesmas: this.state.Puskesmas,
          });
          const dataCocCompare = _.filter(dataCocFinal, {
            Bulan: this.state.Bulan,
          });
          const dataCocCompareKIA = _.filter(dataCocFinalKIA, {
            Bulan: this.state.Bulan,
          });
          console.log(dataCocCompareKIA);
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
              let TempDataPersentaseLahirHidupTL = 0;
              let TempDataPersentaseLahirMatiTL = 0;
              let TempDataPersentasePencapaianKNPertamaTL = 0;
              let TempDataPersentasePencapaianKNKeduaTL = 0;
              let TempDataPersentasePencapaianKNLengkapTL = 0;
              let TempDataPersentaseNeonatalKompTL = 0;
              let TempDataPersentaseKunjunganBayiParipurnaTL = 0;

              if (dataCocFinal.length !== 0) {
                for (let a = 0; a < dataCocFinal.length; a++) {
                  TempDataPersentaseLahirHidupTL =
                    TempDataPersentaseLahirHidupTL +
                    dataCocFinal[a].PencapaianLahirHidupTL;
                  TempDataPersentaseLahirMatiTL =
                    TempDataPersentaseLahirMatiTL +
                    dataCocFinal[a].PencapaianLahirMatiTL;
                  TempDataPersentasePencapaianKNPertamaTL =
                    TempDataPersentasePencapaianKNPertamaTL +
                    dataCocFinal[a].PencapaianKNPertamaTL;
                  TempDataPersentasePencapaianKNKeduaTL =
                    TempDataPersentasePencapaianKNKeduaTL +
                    dataCocFinal[a].PencapaianKNKeduaTL;
                  TempDataPersentasePencapaianKNLengkapTL =
                    TempDataPersentasePencapaianKNLengkapTL +
                    dataCocFinal[a].PencapaianKNLengkapTL;
                  TempDataPersentaseNeonatalKompTL =
                    TempDataPersentaseNeonatalKompTL +
                    dataCocFinal[a].NeonatalKompTL;
                  TempDataPersentaseKunjunganBayiParipurnaTL =
                    TempDataPersentaseKunjunganBayiParipurnaTL +
                    dataCocFinal[a].KunjunganBayiParipurnaTL;
                }
                TempDataPersentaseLahirHidupTL =
                  TempDataPersentaseLahirHidupTL +
                  this.state.PencapaianLahirHidupTL;
                TempDataPersentaseLahirMatiTL =
                  TempDataPersentaseLahirMatiTL +
                  this.state.PencapaianLahirMatiTL;
                TempDataPersentasePencapaianKNPertamaTL =
                  TempDataPersentasePencapaianKNPertamaTL +
                  this.state.PencapaianKNPertamaTL;
                TempDataPersentasePencapaianKNKeduaTL =
                  TempDataPersentasePencapaianKNKeduaTL +
                  this.state.PencapaianKNKeduaTL;
                TempDataPersentasePencapaianKNLengkapTL =
                  TempDataPersentasePencapaianKNLengkapTL +
                  this.state.PencapaianKNLengkapTL;
                TempDataPersentaseNeonatalKompTL =
                  TempDataPersentaseNeonatalKompTL + this.state.NeonatalKompTL;
                TempDataPersentaseKunjunganBayiParipurnaTL =
                  TempDataPersentaseKunjunganBayiParipurnaTL +
                  this.state.KunjunganBayiParipurnaTL;
              } else {
                TempDataPersentaseLahirHidupTL =
                  TempDataPersentaseLahirHidupTL +
                  this.state.PencapaianLahirHidupTL;
                TempDataPersentaseLahirMatiTL =
                  TempDataPersentaseLahirMatiTL +
                  this.state.PencapaianLahirMatiTL;
                TempDataPersentasePencapaianKNPertamaTL =
                  TempDataPersentasePencapaianKNPertamaTL +
                  this.state.PencapaianKNPertamaTL;
                TempDataPersentasePencapaianKNKeduaTL =
                  TempDataPersentasePencapaianKNKeduaTL +
                  this.state.PencapaianKNKeduaTL;
                TempDataPersentasePencapaianKNLengkapTL =
                  TempDataPersentasePencapaianKNLengkapTL +
                  this.state.PencapaianKNLengkapTL;
                TempDataPersentaseNeonatalKompTL =
                  TempDataPersentaseNeonatalKompTL + this.state.NeonatalKompTL;
                TempDataPersentaseKunjunganBayiParipurnaTL =
                  TempDataPersentaseKunjunganBayiParipurnaTL +
                  this.state.KunjunganBayiParipurnaTL;
              }
              const dataCocKIA = {
                Tahun: this.state.Tahun,
                Bulan: this.state.Bulan,
                Puskesmas: this.state.Puskesmas,
                RumahTL: this.state.RumahTL,
                PosyanduTL: this.state.PosyanduTL,
                PolindesTL: this.state.PolindesTL,
                PustuTL: this.state.PustuTL,
                PuskesmasTL: this.state.PuskesmasTL,
                BPSTL: this.state.BPSTL,
                RSUTL: this.state.RSUTL,
                LuarWilayahTL: this.state.LuarWilayahTL,
                RumahTLMati: this.state.RumahTLMati,
                PosyanduTLMati: this.state.PosyanduTLMati,
                PolindesTLMati: this.state.PolindesTLMati,
                PustuTLMati: this.state.PustuTLMati,
                PuskesmasTLMati: this.state.PuskesmasTLMati,
                BPSTLMati: this.state.BPSTLMati,
                RSUTLMati: this.state.RSUTLMati,
                LuarWilayahTLMati: this.state.LuarWilayahTLMati,
              };
              const dataKIA = {
                Tahun: this.state.Tahun,
                Bulan: this.state.Bulan,
                Puskesmas: this.state.Puskesmas,
                SasaranKelahiranHidupLK: this.state.SasaranKelahiranHidupLK,
                SasaranKelahiranHidupPR: this.state.SasaranKelahiranHidupPR,
                SasaranKelahiranHidupTL: this.state.SasaranKelahiranHidupTL,
                SasaranBayiRistiLK: this.state.SasaranBayiRistiLK,
                SasaranBayiRistiPR: this.state.SasaranBayiRistiPR,
                SasaranBayiRistiTL: this.state.SasaranBayiRistiTL,
                SasaranBayiLK: this.state.SasaranBayiLK,
                SasaranBayiPR: this.state.SasaranBayiPR,
                SasaranBayiTL: this.state.SasaranBayiTL,
                PencapaianLahirHidupLK: this.state.PencapaianLahirHidupTL,
                PencapaianLahirHidupPR: this.state.PencapaianLahirHidupPR,
                PencapaianLahirHidupTL: this.state.PencapaianLahirHidupTL,
                PencapaianLahirHidupPersentase:
                  (TempDataPersentaseLahirHidupTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                PencapaianLahirMatiLK: this.state.PencapaianLahirMatiLK,
                PencapaianLahirMatiPR: this.state.PencapaianLahirMatiPR,
                PencapaianLahirMatiTL: this.state.PencapaianLahirMatiTL,
                PencapaianLahirMatiPersentase:
                  (TempDataPersentaseLahirMatiTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                PencapaianKNPertamaLK: this.state.PencapaianKNPertamaLK,
                PencapaianKNPertamaPR: this.state.PencapaianKNPertamaPR,
                PencapaianKNPertamaTL: this.state.PencapaianKNPertamaTL,
                PencapaianKNPertamaPersentase:
                  (TempDataPersentasePencapaianKNPertamaTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                PencapaianKNKeduaLK: this.state.PencapaianKNKeduaLK,
                PencapaianKNKeduaPR: this.state.PencapaianKNKeduaPR,
                PencapaianKNKeduaTL: this.state.PencapaianKNKeduaTL,
                PencapaianKNKeduaPersentase:
                  (TempDataPersentasePencapaianKNKeduaTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                PencapaianKNLengkapLK: this.state.PencapaianKNLengkapLK,
                PencapaianKNLengkapPR: this.state.PencapaianKNLengkapPR,
                PencapaianKNLengkapTL: this.state.PencapaianKNLengkapTL,
                PencapaianKNLengkapPersentase:
                  (TempDataPersentasePencapaianKNLengkapTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                NeonatalKompLK: this.state.NeonatalKompLK,
                NeonatalKompPR: this.state.NeonatalKompPR,
                NeonatalKompTL: this.state.NeonatalKompTL,
                NeonatalKompPersentase:
                  (TempDataPersentaseNeonatalKompTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
                KunjunganBayiParipurnaLK: this.state.KunjunganBayiParipurnaLK,
                KunjunganBayiParipurnaPR: this.state.KunjunganBayiParipurnaPR,
                KunjunganBayiParipurnaTL: this.state.KunjunganBayiParipurnaTL,
                KunjunganBayiParipurnaPersentase:
                  (TempDataPersentaseKunjunganBayiParipurnaTL /
                    this.state.SasaranKelahiranHidupTL) *
                  100,
              };
              console.log(dataKIA, dataCocKIA);
              this.props.DataCocEdit(dataCocCompare[0].id, dataKIA);
              if (dataCocCompareKIA.length == 1) {
                this.props.DataCocKIAEdit(dataCocCompareKIA[0].id, dataCocKIA);
              } else {
                this.props.addDataKIACoc(dataCocKIA);
              }
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
            // Presentase Lahir Hidup Total
            let TempDataPersentaseLahirHidupTL = 0;
            let TempDataPersentaseLahirMatiTL = 0;
            let TempDataPersentasePencapaianKNPertamaTL = 0;
            let TempDataPersentasePencapaianKNKeduaTL = 0;
            let TempDataPersentasePencapaianKNLengkapTL = 0;
            let TempDataPersentaseNeonatalKompTL = 0;
            let TempDataPersentaseKunjunganBayiParipurnaTL = 0;
            // Hitung Total LahirHidup
            if (dataCocFinal.length !== 0) {
              for (let a = 0; a < dataCocFinal.length; a++) {
                TempDataPersentaseLahirHidupTL =
                  TempDataPersentaseLahirHidupTL +
                  dataCocFinal[a].PencapaianLahirHidupTL;
                TempDataPersentaseLahirMatiTL =
                  TempDataPersentaseLahirMatiTL +
                  dataCocFinal[a].PencapaianLahirMatiTL;
                TempDataPersentasePencapaianKNPertamaTL =
                  TempDataPersentasePencapaianKNPertamaTL +
                  dataCocFinal[a].PencapaianKNPertamaTL;
                TempDataPersentasePencapaianKNKeduaTL =
                  TempDataPersentasePencapaianKNKeduaTL +
                  dataCocFinal[a].PencapaianKNKeduaTL;
                TempDataPersentasePencapaianKNLengkapTL =
                  TempDataPersentasePencapaianKNLengkapTL +
                  dataCocFinal[a].PencapaianKNLengkapTL;
                TempDataPersentaseNeonatalKompTL =
                  TempDataPersentaseNeonatalKompTL +
                  dataCocFinal[a].NeonatalKompTL;
                TempDataPersentaseKunjunganBayiParipurnaTL =
                  TempDataPersentaseKunjunganBayiParipurnaTL +
                  dataCocFinal[a].KunjunganBayiParipurnaTL;
              }
              TempDataPersentaseLahirHidupTL =
                TempDataPersentaseLahirHidupTL +
                this.state.PencapaianLahirHidupTL;
              TempDataPersentaseLahirMatiTL =
                TempDataPersentaseLahirMatiTL +
                this.state.PencapaianLahirMatiTL;
              TempDataPersentasePencapaianKNPertamaTL =
                TempDataPersentasePencapaianKNPertamaTL +
                this.state.PencapaianKNPertamaTL;
              TempDataPersentasePencapaianKNKeduaTL =
                TempDataPersentasePencapaianKNKeduaTL +
                this.state.PencapaianKNKeduaTL;
              TempDataPersentasePencapaianKNLengkapTL =
                TempDataPersentasePencapaianKNLengkapTL +
                this.state.PencapaianKNLengkapTL;
              TempDataPersentaseNeonatalKompTL =
                TempDataPersentaseNeonatalKompTL + this.state.NeonatalKompTL;
              TempDataPersentaseKunjunganBayiParipurnaTL =
                TempDataPersentaseKunjunganBayiParipurnaTL +
                this.state.KunjunganBayiParipurnaTL;
            } else {
              TempDataPersentaseLahirHidupTL =
                TempDataPersentaseLahirHidupTL +
                this.state.PencapaianLahirHidupTL;
              TempDataPersentaseLahirMatiTL =
                TempDataPersentaseLahirMatiTL +
                this.state.PencapaianLahirMatiTL;
              TempDataPersentasePencapaianKNPertamaTL =
                TempDataPersentasePencapaianKNPertamaTL +
                this.state.PencapaianKNPertamaTL;
              TempDataPersentasePencapaianKNKeduaTL =
                TempDataPersentasePencapaianKNKeduaTL +
                this.state.PencapaianKNKeduaTL;
              TempDataPersentasePencapaianKNLengkapTL =
                TempDataPersentasePencapaianKNLengkapTL +
                this.state.PencapaianKNLengkapTL;
              TempDataPersentaseNeonatalKompTL =
                TempDataPersentaseNeonatalKompTL + this.state.NeonatalKompTL;
              TempDataPersentaseKunjunganBayiParipurnaTL =
                TempDataPersentaseKunjunganBayiParipurnaTL +
                this.state.KunjunganBayiParipurnaTL;
            }
            //
            const dataCocKIA = {
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
              RumahTL: this.state.RumahTL,
              PosyanduTL: this.state.PosyanduTL,
              PolindesTL: this.state.PolindesTL,
              PustuTL: this.state.PustuTL,
              PuskesmasTL: this.state.PuskesmasTL,
              BPSTL: this.state.BPSTL,
              RSUTL: this.state.RSUTL,
              LuarWilayahTL: this.state.LuarWilayahTL,
              RumahTLMati: this.state.RumahTLMati,
              PosyanduTLMati: this.state.PosyanduTLMati,
              PolindesTLMati: this.state.PolindesTLMati,
              PustuTLMati: this.state.PustuTLMati,
              PuskesmasTLMati: this.state.PuskesmasTLMati,
              BPSTLMati: this.state.BPSTLMati,
              RSUTLMati: this.state.RSUTLMati,
              LuarWilayahTLMati: this.state.LuarWilayahTLMati,
            };
            const dataKIA = {
              Tahun: this.state.Tahun,
              Bulan: this.state.Bulan,
              Puskesmas: this.state.Puskesmas,
              SasaranKelahiranHidupLK: this.state.SasaranKelahiranHidupLK,
              SasaranKelahiranHidupPR: this.state.SasaranKelahiranHidupPR,
              SasaranKelahiranHidupTL: this.state.SasaranKelahiranHidupTL,
              SasaranBayiRistiLK: this.state.SasaranBayiRistiLK,
              SasaranBayiRistiPR: this.state.SasaranBayiRistiPR,
              SasaranBayiRistiTL: this.state.SasaranBayiRistiTL,
              SasaranBayiLK: this.state.SasaranBayiLK,
              SasaranBayiPR: this.state.SasaranBayiPR,
              SasaranBayiTL: this.state.SasaranBayiTL,
              PencapaianLahirHidupLK: this.state.PencapaianLahirHidupTL,
              PencapaianLahirHidupPR: this.state.PencapaianLahirHidupPR,
              PencapaianLahirHidupTL: this.state.PencapaianLahirHidupTL,
              // Penghitungan Presentase Lahir Hidup Total
              PencapaianLahirHidupPersentase:
                (TempDataPersentaseLahirHidupTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              PencapaianLahirMatiLK: this.state.PencapaianLahirMatiTL,
              PencapaianLahirMatiPR: this.state.PencapaianLahirMatiPR,
              PencapaianLahirMatiTL: this.state.PencapaianLahirMatiTL,
              PencapaianLahirMatiPersentase:
                (TempDataPersentaseLahirMatiTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              PencapaianKNPertamaLK: this.state.PencapaianKNPertamaLK,
              PencapaianKNPertamaPR: this.state.PencapaianKNPertamaPR,
              PencapaianKNPertamaTL: this.state.PencapaianKNPertamaTL,
              PencapaianKNPertamaPersentase:
                (TempDataPersentasePencapaianKNPertamaTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              PencapaianKNKeduaLK: this.state.PencapaianKNKeduaLK,
              PencapaianKNKeduaPR: this.state.PencapaianKNKeduaPR,
              PencapaianKNKeduaTL: this.state.PencapaianKNKeduaTL,
              PencapaianKNKeduaPersentase:
                (TempDataPersentasePencapaianKNKeduaTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              PencapaianKNLengkapLK: this.state.PencapaianKNLengkapLK,
              PencapaianKNLengkapPR: this.state.PencapaianKNLengkapPR,
              PencapaianKNLengkapTL: this.state.PencapaianKNLengkapTL,
              PencapaianKNLengkapPersentase:
                (TempDataPersentasePencapaianKNLengkapTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              NeonatalKompLK: this.state.NeonatalKompLK,
              NeonatalKompPR: this.state.NeonatalKompPR,
              NeonatalKompTL: this.state.NeonatalKompTL,
              NeonatalKompPersentase:
                (TempDataPersentaseNeonatalKompTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
              KunjunganBayiParipurnaLK: this.state.KunjunganBayiParipurnaLK,
              KunjunganBayiParipurnaPR: this.state.KunjunganBayiParipurnaPR,
              KunjunganBayiParipurnaTL: this.state.KunjunganBayiParipurnaTL,
              KunjunganBayiParipurnaPersentase:
                (TempDataPersentaseKunjunganBayiParipurnaTL /
                  this.state.SasaranKelahiranHidupTL) *
                100,
            };
            console.log(dataKIA, dataCocKIA);
            this.props.addDataCoc(dataKIA);
            this.props.addDataKIACoc(dataCocKIA);
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
    return (
      <Page title="Dashboard | Imunisasi">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Insert Data KIA</Typography>
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
    addDataKIACoc: (dataKIACoc) => dispatch(addDataKIACoc(dataKIACoc)),
    DataCocKIAEdit: (dataKIACoc, id) =>
      dispatch(DataCocKIAEdit(dataKIACoc, id)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataCoc: state.firestore.ordered.KIA,
    COCKIA: state.firestore.ordered.COCKIA,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "KIA" }, { collection: "COCKIA" }])
)(InsertData);
