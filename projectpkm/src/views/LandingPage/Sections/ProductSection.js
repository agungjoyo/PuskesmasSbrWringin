import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div id="about" className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>
            Visi dan Misi Puskesmas Sumber Wringin
          </h2>
          <h3 className={classes.title}>Visi</h3>
          <h5 className={classes.description}>
            {"'"}Mewujudkan Masyarakat Sumber Wringin yang Sehat Mandiri dan
            Berkelanjutan{"'"}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <h3 className={classes.title}>Misi</h3>
        <GridContainer>
          <GridItem xs={10} sm={10} md={3}>
            <InfoArea
              description="Melaksanakan pembangunan berwawasan kesehatan"
              icon={LocalHospitalIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={10} sm={10} md={3}>
            <InfoArea
              description="Memberdayakan masyarakat untuk hidup sehat"
              // description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={HealthAndSafetyIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={10} sm={10} md={3}>
            <InfoArea
              description="Memberikan pelayanan yang bermutu dan merata"
              icon={VerifiedUser}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={10} sm={10} md={3}>
            <InfoArea
              description="Memberikan pelayanan individu, keluarga, masyarakat dan lingkungannya"
              icon={MedicalServicesIcon}
              iconColor="warning"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
