import React, { Component } from "react";
// import * as Yup from "yup";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
//import { sentenceCase } from "change-case";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { withFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
//import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
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
import { LoadingButton } from "@mui/lab";
//import Box from "@mui/material/Box";
//import InputLabel from "@mui/material/InputLabel";
//import USERLIST from "../_mocks_/user";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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
const positions = [
  {
    value: "b",
    label: "Kepala Puskesmas",
  },
  {
    value: "USD",
    label: "Penanggung Jawab KIA",
  },
];

class User extends Component {
  state = {
    page: 0,
    order: "asc",
    selected: [],
    orderBy: "name",
    filterName: "",
    rowsPerPage: 5,
    isLoading: true,
    Position: 0,
    showPassword: false,
    open: false,
  };
  render() {
    const { data, auth } = this.props;
    console.log(this.props);
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

      const handleChange = (event) => {
        this.setState({ position: event.target.value });
      };

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

      const { errors, touched, handleSubmit, isSubmitting, getFieldProps } =
        this.props;

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

              <Dialog open={this.state.open} onClose={handleClose}>
                <DialogContent>
                  <DialogContentText>
                    <DialogTitle>Subscribe</DialogTitle>

                    <FormikProvider value={this.props}>
                      <Form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <Stack spacing={3}>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                          >
                            <TextField
                              fullWidth
                              label="Nama Lengkap"
                              {...getFieldProps("Name")}
                              error={Boolean(touched.Name && errors.Name)}
                              helperText={touched.Name && errors.Name}
                            />

                            <TextField
                              fullWidth
                              autoComplete="username"
                              type="email"
                              label="Email"
                              {...getFieldProps("Email")}
                              error={Boolean(touched.Email && errors.Email)}
                              helperText={touched.Email && errors.Email}
                            />
                          </Stack>

                          <TextField
                            fullWidth
                            label="Alamat"
                            {...getFieldProps("Address")}
                            error={Boolean(touched.Address && errors.Address)}
                            helperText={touched.Address && errors.Address}
                          />

                          <TextField
                            fullWidth
                            label="NIP"
                            {...getFieldProps("NIP")}
                            error={Boolean(touched.NIP && errors.NIP)}
                            helperText={touched.NIP && errors.NIP}
                          />

                          <TextField
                            fullWidth
                            type="number"
                            label="Nomor Telepon"
                            {...getFieldProps("phonenum", {
                              required: {
                                value: true,
                                message: "Please fill this field",
                              },
                              pattern: {
                                value: /^[1-9]\d*(\d+)?$/i,
                                message: "Please enter an integer",
                              },
                              min: {
                                value: 1,
                                message: "Value should be atleast 1",
                              },
                            })}
                            error={errors?.index ? true : false}
                            helperText={errors?.index?.message}
                          />

                          <TextField
                            fullWidth
                            select
                            label="Jabatan"
                            value={this.state.Position}
                            onChange={handleChange}
                            SelectProps={{
                              native: true,
                            }}
                            helperText="Pilih Posisi/Jabatan Anda"
                          >
                            {positions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>

                          <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={this.state.showPassword ? "text" : "password"}
                            label="Password"
                            id="password"
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}
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
                            error={Boolean(touched.Password && errors.Password)}
                            helperText={touched.Password && errors.Password}
                          />

                          <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                          >
                            Simpan
                          </LoadingButton>
                        </Stack>
                      </Form>
                    </FormikProvider>

                    <DialogActions>
                      <Button onClick={handleClose}>Batal</Button>
                      <Button onClick={handleClose}>Simpan</Button>
                    </DialogActions>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.firestore.ordered.Auth, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      Name: "",
      Email: "",
      Address: "",
      NIP: "",
      PhoneNumber: "",
      Position: "",
      Password: "",
    }),
    validate: () => {},
    handleSubmit: () => {
      Navigate("/dashboard", { replace: true });
    },
  }),
  //database
  firestoreConnect([{ collection: "Auth" }]),
  connect(mapStateToProps)
)(User);
