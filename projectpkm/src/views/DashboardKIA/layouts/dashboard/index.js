import React, { Component } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import {
  sidebarConfig,
  sidebarConfig_KIA,
  sidebarConfig_IMUNISASI,
  sidebarConfig_GIZI,
} from "./SidebarConfig";
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
    const { auth, authData } = this.props;
    if (!auth.uid) return <Navigate to="/" />;
    if (auth.isLoaded && authData !== undefined) {
      const authDataCurrent = _.filter(authData, {
        id: auth.uid,
      });
      const authInit = auth.uid;
      const authDataKIA = _.filter(authData, { id: authInit });
      const Name = authDataKIA[0].Name;
      let Position = "";
      if (authDataCurrent.length == 1) {
        Position = authDataCurrent[0].Position;
        if (Position == "Kepala Puskesmas") {
          return (
            <RootStyle>
              <DashboardNavbar
                onOpenSidebar={() => this.setState({ open: true })}
              />
              <DashboardSidebar
                sidebarConfig={sidebarConfig}
                isOpenSidebar={this.state.open}
                onCloseSidebar={() => this.setState({ open: false })}
                Name={Name}
              />
              <MainStyle>
                <Outlet Name={Name} />
              </MainStyle>
            </RootStyle>
          );
        } else if (Position == "KIA") {
          return (
            <RootStyle>
              <DashboardNavbar
                onOpenSidebar={() => this.setState({ open: true })}
              />
              <DashboardSidebar
                sidebarConfig={sidebarConfig_KIA}
                isOpenSidebar={this.state.open}
                onCloseSidebar={() => this.setState({ open: false })}
                Name={Name}
              />
              <MainStyle>
                <Outlet />
              </MainStyle>
            </RootStyle>
          );
        } else if (Position == "Imunisasi") {
          return (
            <RootStyle>
              <DashboardNavbar
                onOpenSidebar={() => this.setState({ open: true })}
              />
              <DashboardSidebar
                sidebarConfig={sidebarConfig_IMUNISASI}
                isOpenSidebar={this.state.open}
                onCloseSidebar={() => this.setState({ open: false })}
                Name={Name}
              />
              <MainStyle>
                <Outlet />
              </MainStyle>
            </RootStyle>
          );
        } else if (Position == "Gizi") {
          return (
            <RootStyle>
              <DashboardNavbar
                onOpenSidebar={() => this.setState({ open: true })}
              />
              <DashboardSidebar
                sidebarConfig={sidebarConfig_GIZI}
                isOpenSidebar={this.state.open}
                onCloseSidebar={() => this.setState({ open: false })}
                Name={Name}
              />
              <MainStyle>
                <Outlet />
              </MainStyle>
            </RootStyle>
          );
        }
      }
    } else {
      return <div>Loading...</div>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    authData: state.firestore.ordered.Auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Auth" }])
)(DashboardLayout);
