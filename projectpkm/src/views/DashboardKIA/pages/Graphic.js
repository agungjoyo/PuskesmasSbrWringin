import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import {
  GraphicCocPKM,
  GraphicCocPKMKIAKN,
  GraphicCocPKMKomp,
} from "views/DashboardKIA/components/graphic";

class Graphic extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKM />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKMKIAKN />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKMKomp />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default Graphic;
