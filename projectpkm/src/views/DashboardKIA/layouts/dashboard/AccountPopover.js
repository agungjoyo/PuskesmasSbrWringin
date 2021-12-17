import React, { Component } from "react";
import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import { signOut } from "views/store/actions/authAction";
//
import account from "../../_mocks_/account";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

class AccountPopover extends Component {
  state = {
    open: false,
  };
  constructor(props) {
    super(props);
    this.anchorRef = React.createRef(null);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const MENU_OPTIONS = [
      {
        label: "Home",
        icon: homeFill,
        linkTo: "/",
      },
      {
        label: "Profile",
        icon: personFill,
        linkTo: "#",
      },
      {
        label: "Settings",
        icon: settings2Fill,
        linkTo: "#",
      },
    ];
    return (
      <>
        <IconButton
          ref={this.anchorRef}
          onClick={this.handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(this.state.open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
        >
          <Avatar src={account.photoURL} alt="photoURL" />
        </IconButton>

        <MenuPopover
          open={this.state.open}
          onClose={this.handleClose}
          anchorEl={this.anchorRef.current}
          sx={{ width: 220 }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {account.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {account.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={this.handleClose}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}

          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={this.props.signOut}
            >
              Logout
            </Button>
          </Box>
        </MenuPopover>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(AccountPopover);
