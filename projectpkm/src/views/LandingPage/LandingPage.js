import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Scroll from "components/Scroll/Scroll.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
// import bg from "assets/img/img.png";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Scroll showBelow={250} />
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/bgbaru.png").default}>
        <div id="home" className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>SAS-KIA</h1>
              <h2>Puskesmas Sumber Wringin</h2>
              <h4>
                Sistem Informasi Kesehatan Ibu dan Anak (SAS-KIA) dibuat untuk
                memberikan kemudahan kepada petugas KIA dalam mengelola Data.
              </h4>
              <br />
              <Button
                color="success"
                size="lg"
                component={RouterLink}
                to="/login"
                rel="noopener noreferrer"
              >
                <i className="fas fa-sign-in-alt" /> Masuk
              </Button>
            </GridItem>
            {/* <img src={bg}></img> */}
          </GridContainer>
        </div>
      </Parallax>
      <Grid className={classNames(classes.main, classes.mainRaised)}>
        <GridItem className={classes.container}>
          <ProductSection />
        </GridItem>
      </Grid>
      <Grid className={classNames(classes.main, classes.mainRaised)}>
        <GridItem className={classes.container}>
          <TeamSection />
        </GridItem>
      </Grid>
      <Grid className={classNames(classes.main, classes.mainRaised)}>
        <GridItem className={classes.container}>
          <WorkSection />
        </GridItem>
      </Grid>
      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default LandingPage;
