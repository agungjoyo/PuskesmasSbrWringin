import React from "react";
// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
// database
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import {
  //AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  // AppNewsUpdate,
  AppWeeklySales,
  //AppOrderTimeline,
  // AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisitsImun,
  AppWebsiteVisitGizi,
  //AppTrafficBySite,
  // AppCurrentSubject,
  // AppConversionRates
} from "../components/_dashboard/app";

// ----------------------------------------------------------------------

function DashboardApp(data) {
  const authInit = data.auth.uid;
  const authDataKIA = _.filter(data.authData, { id: authInit });
  const Name = authDataKIA[0].Name;
  if (data.auth.isLoaded == false) {
    return <div>Loading...</div>;
  } else {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, {Name} Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisits />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisitsImun />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisitGizi />
            </Grid>

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
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={5}>
              <AppTrafficBySite />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={7}>
              <AppTasks />
            </Grid> */}
          </Grid>
        </Container>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.firestore.ordered.KIA, //database
    auth: state.firebase.auth,
    authData: state.firestore.ordered.Auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "KIA" }, { collection: "Auth" }]),
  connect(mapStateToProps)
)(DashboardApp);
