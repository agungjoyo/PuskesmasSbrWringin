import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import GraphicCocPKMGizi from "views/DashboardKIA/components/graphic/GraphicCocPKMGizi";

class GraphicGizi extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocPKMGizi />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default GraphicGizi;
