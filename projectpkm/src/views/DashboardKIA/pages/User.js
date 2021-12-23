import React, { Component } from "react";
// import * as Yup from "yup";
import { filter, _ } from "lodash";
import { Icon } from "@iconify/react";
//import { sentenceCase } from "change-case";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, Navigate } from "react-router-dom";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import InputLabel from "@mui/material/InputLabel";
import { withTheme } from "@material-ui/core/styles";
//import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { signUp } from "views/store/actions/authAction";
// import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
// material
import {
  Card,
  Table,
  Stack,
  //Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { firestoreConnect } from "react-redux-firebase";
import { TextField, IconButton, InputAdornment } from "@mui/material";
//import { LoadingButton } from "@mui/lab";
//import Box from "@mui/material/Box";
//import InputLabel from "@mui/material/InputLabel";
//import USERLIST from "../_mocks_/user";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import { Select } from "@material-ui/core";
//import FormControl from "@mui/material/FormControl";
// components
import Page from "../components/Page";
//import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//import { Select } from "@material-ui/core";
//

// ----------------------------------------------------------------------

class User extends Component {
  state = {
    page: 0,
    positionList: ["Kepala Puskesmas", "KIA", "Gizi", "Imunisasi"],
    order: "asc",
    selected: [],
    orderBy: "name",
    filterName: "",
    rowsPerPage: 5,
    isLoading: true,
    Position: 0,
    showPassword: false,
    open: false,
    Name: "",
    Email: "",
    Address: "",
    NIP: "",
    Nomor: "",
    PositionIndex: "",
    Password: "",
    isSubmitting: false,
    isEmpty: [],
    dataEmpty: true,
  };
  getStyles(Position, PositionIndex, theme) {
    return {
      fontWeight:
        PositionIndex?.indexOf(Position) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  handleChangeRegister = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSubmit = () => {
    const finalData = [
      this.state.Name,
      this.state.Email,
      this.state.Address,
      this.state.NIP,
      this.state.Nomor,
      this.state.PositionIndex,
      this.state.Password,
    ];
    const { data } = this.props;
    console.log(data);
    const dataUserFinal = _.filter(data, {
      Name: this.state.Name,
    });
    console.log(this.state.Name);
    console.log(dataUserFinal);
    const dataCompare = _.filter(dataUserFinal, {
      Email: this.state.Email,
    });
    console.log(dataCompare);
    if (dataCompare?.length == 1) {
      this.setstate({ isDuplicate: true });
      console.log(this.state.isDuplicate);
      window.alert(
        "Data yang Anda masukkan sudah ada " +
          this.state.Name +
          " " +
          this.state.Email +
          " for " +
          this.state.NIP
      );
    } else {
      this.setState({ isDuplicate: false });
      console.log(this.state.isDuplicate);
      window.alert(
        "Berhasil " +
          this.state.Name +
          " " +
          this.state.Email +
          " for " +
          this.state.NIP
      );
      const { files, ...finalData } = this.state;
      console.log(files);
      this.props.signUp(finalData);
    }
    const req = [];
    this.setState(
      {
        isSubmitting: true,
      },
      () => {
        for (let i = 0; i < finalData.length; i++) {
          console.log(finalData[i]);
          if (finalData[i].length == 0) {
            req.push("true");
          } else if (finalData[0].length < 2 && finalData[0].length != 0) {
            req.push("Nama Kurang");
          } else if (finalData[3].length <= 18 && finalData[3].length != 0) {
            req.push("NIP Kurang");
          } else if (finalData[4].length >= 12 && finalData[4].length != 0) {
            req.push("Nomer tidak valid");
          } else {
            req.push("false");
          }
        }
        this.setState(
          {
            isEmpty: req,
          },
          () => {
            const dataNew = Array.from(new Set(this.state.isEmpty));
            const dataNewFilter = dataNew.filter((data) =>
              data.match(new RegExp("true", "i"))
            );
            const dataNameFilter = dataNew.filter((data) =>
              data.match(new RegExp("Nama Kurang", "i"))
            );
            const dataNipFilter = dataNew.filter((data) =>
              data.match(new RegExp("NIP Kurang", "i"))
            );

            const dataNomerFilter = dataNew.filter((data) =>
              data.match(new RegExp("Nomer Tidak Valid", "i"))
            );

            if (dataNewFilter == "true") {
              console.log("Data Kurang Lengkap !");
              window.alert("Data Kurang Lengkap !");
              this.setState({ isSubmitting: false });
            } else if (dataNameFilter == "Nama Kurang") {
              console.log("Nama Kurang Lengkap !");
              window.alert("Nama Kurang Lengkap !");
              this.setState({ isSubmitting: false });
            } else if (dataNipFilter == "Nip Kurang") {
              console.log("NIP Kurang Lengkap !");
              window.alert("NIP Kurang Lengkap !");
              this.setState({ isSubmitting: false });
            } else if (dataNomerFilter == "Nomer Tidak Valid") {
              console.log("Nomer Tidak Valid !");
              window.alert("Nomer Tidak Valid !");
              this.setState({ isSubmitting: false });
            } else {
              console.log("Data Sudah Lengkap !");
              window.alert("Data Sudah Lengkap !");
            }
          }
        );
      }
    );
  };
  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    const { data, auth } = this.props;
    console.log(this.state);
    if (!auth.uid) return <Navigate to="/login" />;
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function getComparator(order, orderBy) {
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function applySortFilter(array, comparator, query) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      if (query) {
        return filter(array, (value) => {
          return (
            value.Name.toLowerCase().includes(query.toLowerCase()) ||
            value.Email.toLowerCase().includes(query.toLowerCase()) ||
            value.NIP.toLowerCase().includes(query.toLowerCase()) |
              value.PhoneNumber.toLowerCase().includes(query.toLowerCase()) ||
            value.Address.toLowerCase().includes(query.toLowerCase()) ||
            value.Position.toLowerCase().includes(query.toLowerCase())
          );
        });
      }
      return stabilizedThis.map((el) => el[0]);
    }
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      const TABLE_HEAD = [
        { id: "Name", label: "Nama", alignRight: false },
        { id: "Email", label: "Email", alignRight: false },
        { id: "NIP", label: "NIP", alignRight: false },
        { id: "Position", label: "Posisi", alignRight: false },
        { id: "PhoneNumber", label: "Nomor Telepon", alignRight: false },
        { id: "Address", label: "Alamat", alignRight: false },
        { id: "" },
      ];

      const handleRequestSort = (event, property) => {
        const isAsc =
          this.state.orderBy === property && this.state.order === "asc";
        const orderBy = isAsc ? "desc" : "asc";
        console.log(orderBy);
        isAsc
          ? this.setState({ order: "desc" })
          : this.setState({ order: "asc" });
        this.setState({ orderBy: property });
      };

      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = data.map((n) => n.Name);
          this.setState({ selected: newSelecteds });
          return;
        }
        this.setState({ selected: [] });
      };

      const handleClick = (event, Name) => {
        const selectedIndex = this.state.selected.indexOf(Name);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(this.state.selected, Name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
          newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            this.state.selected.slice(0, selectedIndex),
            this.state.selected.slice(selectedIndex + 1)
          );
        }
        this.setState({ selected: newSelected });
      };

      const handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
      };

      const handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
      };

      const handleFilterByName = (event) => {
        this.setState({
          filterName: event.target.value,
        });
      };

      const emptyRows =
        this.state.page > 0
          ? Math.max(
              0,
              (1 + this.state.page) * this.state.rowsPerPage - data.length
            )
          : 0;

      const filteredUsers = applySortFilter(
        data,
        getComparator(this.state.order, this.state.orderBy),
        this.state.filterName
      );

      const isUserNotFound = filteredUsers.length === 0;

      //const navigate = useNavigate();

      // const RegisterSchema = Yup.object().shape({
      //   Name: Yup.string()
      //     .min(2, "Terlalu Pendek!")
      //     .max(50, "Terlalu Panjang!")
      //     .required("Masukkan Nama Lengkap"),
      //   Address: Yup.string().required("Masukkan Alamat"),
      //   Email: Yup.string()
      //     .email("Masukkan alamat Email yang valid")
      //     .required("Masukkan Email"),
      //   Password: Yup.string().required("Password is required"),
      // });

      // const { handleSubmit, isSubmitting } = this.props;

      // const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        this.setState({ open: true });
      };

      const handleClose = () => {
        this.setState({ open: false });
      };

      return (
        <Page title="Daftar Pengguna">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Daftar Pengguna
              </Typography>
              <Button
                variant="outlined"
                component={RouterLink}
                onClick={handleClickOpen}
                to="#"
                startIcon={<Icon icon={plusFill} />}
              >
                Tambah Pengguna
              </Button>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Dialog open={this.state.open} onClose={handleClose}>
                  <DialogContent>
                    <DialogContentText>
                      <DialogTitle>Tambah Pengguna</DialogTitle>
                      <Stack spacing={3}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                        >
                          <TextField
                            required
                            fullWidth
                            label="Nama Lengkap"
                            name="Name"
                            onInput={(event) => {
                              var text = event.target.value;
                              text = text.replace(/[^A-Za-z]/g, "");
                              event.target.value = text;
                            }}
                            onChange={this.handleChangeRegister}
                            inputProps={{ maxLength: 50 }}
                          />
                          <TextField
                            required
                            onChange={this.handleChangeRegister}
                            fullWidth
                            autoComplete="username"
                            name="Email"
                            type="email"
                            label="Email"
                          />
                        </Stack>
                        <TextField
                          required
                          fullWidth
                          label="Alamat"
                          name="Address"
                          onChange={this.handleChangeRegister}
                        />
                        <TextField
                          required
                          fullWidth
                          type="number"
                          label="NIP"
                          name="NIP"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 18);
                          }}
                          onChange={this.handleChangeRegister}
                          inputProps={{ maxLength: 18 }}
                        />
                        <TextField
                          onChange={this.handleChangeRegister}
                          required
                          fullWidth
                          name="Nomor"
                          type="number"
                          label="Nomor Telepon"
                          inputProps={{ maxLength: 12 }}
                        />
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                          <InputLabel id="demo-simple-select-helper-label">
                            Position
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // value={this.state.monthIndex}
                            // onChange={this.handleChange}
                            // label="Month"
                            //========================Multiple========================
                            // labelId="demo-multiple-chip-label"
                            // id="demo-multiple-chip"
                            // multiple
                            name="PositionIndex"
                            required
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            // renderValue={(selected) => (
                            //   <Box
                            //     sx={{
                            //       display: "flex",
                            //       flexWrap: "wrap",
                            //       gap: 0.5,
                            //     }}
                            //   >
                            //     {selected.map((value) => (
                            //       <Chip key={value} label={value} />
                            //     ))}
                            //   </Box>
                            // )}
                            MenuProps={MenuProps}
                            value={this.state.PositionIndex}
                            onChange={this.handleChangeRegister}
                            //=========================================================
                          >
                            {this.state.positionList.map((position) => (
                              <MenuItem
                                key={position}
                                value={position}
                                style={this.getStyles(
                                  this.state.Position,
                                  this.state.PositionIndex,
                                  this.props.theme
                                )}
                              >
                                {position}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          required
                          type={this.state.showPassword ? "text" : "password"}
                          label="Password"
                          name="Password"
                          id="password"
                          onSubmit={this.handleSubmit}
                          onChange={this.handleChangeRegister}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={this.handleShowPassword}
                                  edge="end"
                                >
                                  <Icon
                                    icon={
                                      this.state.showPassword
                                        ? eyeFill
                                        : eyeOffFill
                                    }
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          fullWidth
                          size="large"
                          type="submit"
                          onClick={this.handleSubmit}
                          variant="contained"
                          loading={this.state.isSubmitting}
                        >
                          Simpan
                        </Button>
                      </Stack>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </form>
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={this.state.selected.length}
                filterName={this.state.filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={data.length}
                      numSelected={this.state.selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            Name,
                            Address,
                            Email,
                            Position,
                            NIP,
                            PhoneNumber,
                          } = row;
                          const isItemSelected =
                            this.state.selected.indexOf(Name) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, Name)}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={Name} src={avatarUrl} /> */}
                                  <Typography variant="subtitle2" noWrap>
                                    {Name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{Email}</TableCell>
                              <TableCell align="left">{NIP}</TableCell>
                              <TableCell align="left">{Position}</TableCell>
                              <TableCell align="left">{PhoneNumber}</TableCell>
                              <TableCell align="left">{Address}</TableCell>

                              {/* <TableCell align="left">
                              {isVerified ? "Yes" : "No"}
                            </TableCell> */}

                              <TableCell align="right">
                                <UserMoreMenu />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound
                              searchQuery={this.state.filterName}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (data) => dispatch(signUp(data)),
  };
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    data: state.firestore.ordered.Auth, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Auth" }]),
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(User);
