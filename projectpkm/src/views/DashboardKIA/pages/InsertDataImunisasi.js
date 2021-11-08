import React, { Component } from "react";
//material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import csv from "csv";
import Page from "../components/Page";

class InsertDataImunisasi extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      Tahun: "",
      Bulan: "",
      Puskesmas: "",
      Sasaran: "",
      HBOLess1day: "", //HBo<24jam
      HBOOneWeek: "", //HBO0-7hari
      BCG: "",
      Polio1: "",
      DPTHB1: "", //DPT-HB1
      Polio2: "",
      DPTHB2: "",
      Polio3: "",
      DPTHB3: "",
      Polio4: "",
      IPV: "",
      CampakRubella: "",
      IDL: "",
    };
  }
  onDrop(files) {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse({ delimiter: ";" }, reader.result, (err, data) => {
        const tahun = data[3][2];
        const bulan = data[4][2];
        const tahunSplit = tahun.split(" ");
        const bulanSplit = bulan.split(" ");
        console.log(tahunSplit, bulanSplit);
        this.setState({
          Tahun: tahunSplit[1],
          Bulan: bulanSplit[1],
        });

        console.log(data);
      });
    };
    reader.readAsBinaryString(file);
  }

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
                <Dropzone onDrop={this.onDrop.bind(this)}>
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
                <br />
                <br />
                <h2>
                  Upload
                  <font color="#00A4FF"> CSV</font>
                  <br />
                  File Anda Disini
                </h2>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}

export default InsertDataImunisasi;
