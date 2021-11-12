import React, { Component } from "react";
//material
import { Box, Grid, Container, Typography, Card, Fab } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
import * as XLSX from "xlsx";
import AddIcon from "@material-ui/icons/Add";
import Page from "../components/Page";

//import { initial } from "lodash";

class InsertDataImunisasi extends Component {
  state = {
    files: [],
  };
  readExcell = (event) => {
    this.setState({ files: event });
    const file = event.target.files[0];
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
        const tahunSet = data[3][2];
        const tahunSplit = tahunSet.split(" ");
        const tahun = tahunSplit[1];
        console.log(tahun);
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
                <div>
                  <label htmlFor="uploadImun">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="uploadImun"
                      name="uploadImun"
                      onChange={this.readExcell.bind(this)}
                      //   (e) => {
                      //   const file = e.target.files[0];
                      //   readExcell(file);
                      // }}
                    />
                    <Fab
                      color="secondary"
                      size="medium"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Upload File
                    </Fab>
                  </label>
                  <p style={{ margin: 30 }}>
                    upload file Anda disini atau klik pilih file
                  </p>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}

export default InsertDataImunisasi;
