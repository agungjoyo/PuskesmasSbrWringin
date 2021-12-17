import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import GraphicCocPKMImun from "views/DashboardKIA/components/graphic/GraphicCocPKMImun";

class GraphicImun extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKMImun />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default GraphicImun;
