import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import {
  GraphicCocBalitaPur,
  GraphicCocBayiPur,
  GraphicCocK1_FE1,
  GraphicCocK4_VitA,
  GraphicCocKB,
  GraphicCocKN1_HB,
  GraphicCocLahirMati,
  GraphicCocLahirMatiPenyebab,
  GraphicCocLahirTempat,
} from "views/DashboardKIA/components/graphic/GraphicCoc";

class Graphic extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocBalitaPur />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocBayiPur />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocK1_FE1 />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocK4_VitA />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocKB />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocKN1_HB />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocLahirMati />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocLahirMatiPenyebab />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocLahirTempat />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default Graphic;
