import React, { Component } from "react";
import { Icon } from "@iconify/react";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import { removeDataCocGizi } from "views/store/actions/dataCocGiziAction";
import { connect } from "react-redux";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// ----------------------------------------------------------------------

class UserMoreMenuGizi extends Component {
  state = {
    isOpen: false,
    anchorEl: false,
  };
  render() {
    const { removeDataCocGizi, id } = this.props;
    return (
      <div>
        <IconButton
          onClick={(e) =>
            this.setState({
              isOpen: !this.state.isOpen,
              anchorEl: e.currentTarget,
            })
          }
        >
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>

        <Menu
          open={this.state.isOpen}
          anchorEl={this.state.anchorEl}
          onClose={() => this.setState({ isOpen: !this.state.isOpen })}
          PaperProps={{
            sx: { width: 200, maxWidth: "100%" },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => {
              if (confirm("Apakah Anda Ingin Menghapus Data Ini?") == true) {
                console.log("True");
                removeDataCocGizi(id);
              } else {
                window.alert("Anda Telah Membatalkan Penghapusan Data");
              }
            }}
          >
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeDataCocGizi: (id) => {
      dispatch(removeDataCocGizi(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserMoreMenuGizi);
