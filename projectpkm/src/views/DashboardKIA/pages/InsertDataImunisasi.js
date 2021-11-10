import React, { Component } from "react";
//material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
import * as XLSX from "xlsx";
import Page from "../components/Page";

//import { initial } from "lodash";

class InsertDataImunisasi extends Component {
  render() {
    // const [data, setdata] = useState(initialState);

    const readExcell = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: "buffer" });

          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((d) => {
        console.log(d);
      });
    };

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
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcell(file);
                    }}
                  ></input>
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
