import React, { Component } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Navigate to="/" />;
    return (
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => this.setState({ open: true })} />
        <DashboardSidebar
          isOpenSidebar={this.state.open}
          onCloseSidebar={() => this.setState({ open: false })}
        />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.firebase.auth);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(DashboardLayout);
