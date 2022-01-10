import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import GraphicCocPKMGizi from "views/DashboardKIA/components/graphic/GraphicCocPKMGizi";
import GraphicTBU from "../components/graphic/GraphicGizi.js/GraphicTBU";
import GraphicBBTB from "../components/graphic/GraphicGizi.js/GraphicBBTB";
import GraphicBBU from "../components/graphic/GraphicGizi.js/GraphicBBU";
import GraphicBUMKEK from "../components/graphic/GraphicGizi.js/GraphicBUMKEK";

class GraphicGizi extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKMGizi />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicTBU />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicBBTB />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicBBU />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicBUMKEK />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default GraphicGizi;
