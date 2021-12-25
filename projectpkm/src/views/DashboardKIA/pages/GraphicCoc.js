import React, { Component } from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import Page from "../components/Page";
import { GraphicCocK1_F1 } from "views/DashboardKIA/components/graphic";

class GraphicCoc extends Component {
  render() {
    return (
      <Page title="Dashboard | Minimal-UI">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <GraphicCocK1_F1 />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default GraphicCoc;
