import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link as RouterLink } from "react-router-dom";
// import { Link } from "@mui/material";
import { Icon } from "@iconify/react";
import signInLine from "@iconify/icons-clarity/sign-in-line";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
// import {Apps, CloudDownload} from "@material-ui/icons";

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// import ProductSection from "../../views/LandingPage/Sections/ProductSection";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinksIn() {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {/* <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        /> */}
        <Button href="#home" color="transparent" className="smoothscroll">
          Beranda
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="#about" color="transparent" className="smoothscroll">
          {""}
          tentang Kami
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="#grafik" color="transparent" className="smoothscroll">
          {""}
          Grafik
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className="smoothscroll" href="#kontak">
          {" "}
          Kontak
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        {/* <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{tooltip: classes.tooltip}}
        > */}
        <Button
          color="success"
          style={{ fontWeight: "normal" }}
          className={classes.navLink}
          component={RouterLink}
          to="/Login"
        >
          {/* <Link
            style={{ color: "white", margin: 0 }}
            variant="button"
            component={RouterLink}
            to="/login"
          > */}
          <Icon icon={signInLine} />
          Masuk
          {/* </Link> */}
        </Button>
        {/* </Tooltip> */}
      </ListItem>
    </List>
  );
}
