import React from "react";
import HeaderInLinks from "components/Header/HeaderInLinks";
import HeaderOutLinks from "components/Header/HeaderOutLinks";
import { connect } from "react-redux";

const HeaderLinks = (state) => {
  const { auth } = state;
  console.log(auth);
  const links = auth.uid ? <HeaderInLinks /> : <HeaderOutLinks />;
  return links;
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(HeaderLinks);
