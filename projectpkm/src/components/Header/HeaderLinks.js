/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import {Link} from "react-router-dom";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {Apps, CloudDownload} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import ProductSection from "../../views/LandingPage/Sections/ProductSection";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
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
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          Beranda
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href={ProductSection}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          {""}
          tentang Kami
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://twitter.com/CreativeTim?ref=creativetim"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          {" "}
          Grafik
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          href="#kontak"
          target="_blank"
          className={classes.navLink}
        >
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
          size="lg"
          href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
          target="_blank"
          className={classes.navLink}
          rel="noopener noreferrer"
        >
          <i className="fas fa-sign-in-alt" /> Masuk
        </Button>
        {/* </Tooltip> */}
      </ListItem>
    </List>
  );
}
