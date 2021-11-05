import React, { Component } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";
import Dropzone from "react-dropzone";
import csv from "csv";
// components
import Page from "../components/Page";
// import {
//   AppTasks,
//   AppNewUsers,
//   AppBugReports,
//   AppItemOrders,
//   AppNewsUpdate,
//   AppWeeklySales,
//   AppOrderTimeline,
//  AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
// AppCurrentSubject,
// AppConversionRates
// } from "../components/_dashboard/app";

// ----------------------------------------------------------------------

class InsertData extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }
  onDrop(files) {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var userList = [];
        console.log(err);
        for (var i = 0; i < data.length; i++) {
          const name = data[i][0];
          const phoneNumber = data[i][1];
          const address = data[i][2];
          const classType = data[i][3];
          const newUser = {
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            class: classType,
          };
          userList.push(newUser);
          console.log(newUser);
        }
      });
    };
    reader.readAsBinaryString(file);
  }

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
            {/* <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid> */}
            {/* <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisits />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <AppTrafficBySite />
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <AppTasks />
            </Grid> */}
          </Grid>
        </Container>
      </Page>
    );
  }
}

export default InsertData;
