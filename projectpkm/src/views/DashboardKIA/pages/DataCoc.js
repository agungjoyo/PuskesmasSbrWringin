import React, { Component } from "react";
import _, { filter } from "lodash";
import { Icon } from "@iconify/react";
import chartLineData from "@iconify/icons-carbon/chart-line-data";
// import { sentenceCase } from "change-case";
import { connect } from "react-redux";
import plusFill from "@iconify/icons-eva/plus-fill";
import { compose } from "redux"; // database
import { Link as RouterLink, Navigate } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase"; //database
// material
import {
  Card,
  Table,
  Stack,
  //   Avatar,
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
// components
import Page from "../components/Page";
// import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//

// ----------------------------------------------------------------------

class DataCoc extends Component {
  state = {
    page: 0,
    order: "asc",
    selected: [],
    orderBy: "name",
    filterName: "",
    rowsPerPage: 6,
    isLoading: true,
  };
  render() {
    const { data, auth, authData } = this.props;
    if (!auth.uid) return <Navigate to="/login" />;
    const authInit = auth.uid;
    const authDataKIA = _.filter(authData, { id: authInit });
    const Position = authDataKIA[0].Position;
    if (Position == "Gizi" || Position == "Imunisasi")
      return <Navigate to="/dashboard" />;
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
            value.Bulan?.toLowerCase().includes(query.toLowerCase()) ||
            value.Puskesmas?.toLowerCase().includes(query.toLowerCase()) ||
            value.SasaranBayiTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianLahirHidupTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianLahirHidupPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianLahirMatiTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianLahirMatiPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNPertamaTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNPertamaPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNKeduaTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNKeduaPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNLengkapTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.PencapaianKNLengkapPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.NeonatalKompTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.NeonatalKompPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.KunjunganBayiParipurnaTL?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.KunjunganBayiParipurnaPersentase?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Tahun?.toString().toLowerCase().includes(query.toLowerCase())
          );
        });
        // const filteredData = data.filter(item => {
        //   return Object.keys(item).some(key =>
        //     item[key].toLowerCase().includes(lowercasedFilter)
        //   );
        // return filter(array, (_user) => {
        //   _user.Bulan?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        // });
      }
      // return stabilizedThis.map((el) => el[0]);
      return stabilizedThis.map((el) => el[0]);
    }
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      const TABLE_HEAD = [
        { id: "Bulan", label: "Bulan", alignCenter: "center" },
        { id: "Puskesmas", label: "Puskesmas", alignCenter: "center" },
        { id: "SasaranBayiTL", label: "Sasaran", alignCenter: "center" },
        {
          id: "PencapaianLahirHidupTL",
          label: "Bayi Lahir Hidup",
          alignCenter: "center",
        },
        {
          id: "PencapaianLahirHidupPersentase",
          label: "%",
          alignCenter: "center",
        },
        {
          id: "PencapaianLahirMatiTL",
          label: "Bayi Lahir Mati",
          alignCenter: "center",
        },
        {
          id: "PencapaianLahirMatiPersentase",
          label: "%",
          alignCenter: "center",
        },
        { id: "PencapaianKNPertamaTL", label: "KN 1", alignCenter: "center" },
        {
          id: "PencapaianKNPertamaPersentase",
          label: "%",
          alignCenter: "center",
        },
        { id: "PencapaianKNKeduaTL", label: "KN 2", alignCenter: "center" },
        {
          id: "PencapaianKNKeduaPersentase",
          label: "%",
          alignCenter: "center",
        },
        {
          id: "PencapaianKNLengkapTL",
          label: "KN Lengkap",
          alignCenter: "center",
        },
        {
          id: "PencapaianKNLengkapPersentase",
          label: "%",
          alignCenter: "center",
        },
        {
          id: "NeonatalKompTL",
          label: "Neonatal Komplikasi",
          alignCenter: "center",
        },
        {
          id: "NeonatalKompPersentase",
          label: "%",
          alignCenter: "center",
        },
        {
          id: "KunjunganBayiParipurnaTL",
          label: "Bayi Paripurna",
          alignCenter: "center",
        },
        {
          id: "KunjunganBayiParipurnaPersentase",
          label: "%",
          alignCenter: "center",
        },
        { id: "" },
      ];

      // ----------------------------------------------------------------------

      const handleRequestSort = (event, property) => {
        const isAsc =
          this.state.orderBy === property && this.state.order === "asc";
        isAsc
          ? this.setState({ order: "desc" })
          : this.setState({ order: "asc" });
        // this.state.orderBy(property);
        this.setState({ orderBy: property });
      };

      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = data.map((n) => n.name);
          this.setState({ selected: newSelecteds });
          return;
        }
        this.setState({ selected: [] });
      };

      const handleClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(this.state.selected, name);
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
        // this.state.selected(newSelected);
        this.setState({ selected: newSelected });
      };

      const handleChangePage = (event, newPage) => {
        // this.state.page(newPage);
        this.setState({ page: newPage });
      };

      const handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
        // this.state.page(parseInt(event.target.value, 10));
        // this.setState({ page: parseInt(event.target.value, 10) });
        // this.state.page(0);
        // this.setState({ page: 0 });
      };

      const handleFilterByName = (event) => {
        this.setState({
          filterName: event.target.value,
        });
        // filterName(event.target.value);
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
      return (
        <Page title="Data KIA | Minimal-UI">
          <Container>
            <Stack direction="row" justifyContent="space-between" mb={5}>
              <div style={{ pointerEvents: "none" }}>
                <Button
                  sx={{ fontSize: 20, cursor: "none" }}
                  variant="outline"
                  startIcon={<Icon icon={chartLineData} />}
                >
                  {/* <Icon icon={chartLineData} width="30" height="30" /> */}
                  DataKIA
                </Button>
              </div>
              <div sx={{ justify: "flex-end" }}>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/InsertTripleEliminasiKIA"
                  startIcon={<Icon icon={plusFill} />}
                >
                  New Data Triple Eliminasi
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/InsertData"
                  startIcon={<Icon icon={plusFill} />}
                >
                  Tambah Data Baru
                </Button>
              </div>
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={this.state.selected.length}
                filterName={this.state.filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table style={{ tableLayout: "auto" }}>
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
                            Bulan,
                            Puskesmas,
                            SasaranBayiTL,
                            PencapaianLahirHidupTL,
                            PencapaianLahirHidupPersentase,
                            PencapaianLahirMatiTL,
                            PencapaianLahirMatiPersentase,
                            PencapaianKNPertamaTL,
                            PencapaianKNPertamaPersentase,
                            PencapaianKNKeduaTL,
                            PencapaianKNKeduaPersentase,
                            PencapaianKNLengkapTL,
                            PencapaianKNLengkapPersentase,
                            NeonatalKompTL,
                            NeonatalKompPersentase,
                            KunjunganBayiParipurnaTL,
                            KunjunganBayiParipurnaPersentase,
                          } = row;
                          const isItemSelected =
                            this.state.selected.indexOf(Bulan) !== -1;

                          return (
                            <TableRow
                              sx={{ maxWidth: 20 }}
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
                                  onChange={(event) =>
                                    handleClick(event, Bulan)
                                  }
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
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Bulan}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ width: "max-content" }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Puskesmas}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {SasaranBayiTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {PencapaianLahirHidupTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${PencapaianLahirHidupPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {PencapaianLahirMatiTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${PencapaianLahirMatiPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {PencapaianKNPertamaTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${PencapaianKNPertamaPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {PencapaianKNKeduaTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${PencapaianKNKeduaPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {PencapaianKNLengkapTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${PencapaianKNLengkapPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {NeonatalKompTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${NeonatalKompPersentase.toFixed(1)} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {KunjunganBayiParipurnaTL}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {`${KunjunganBayiParipurnaPersentase.toFixed(
                                      1
                                    )} %`}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="right">
                                <UserMoreMenu id={id} />
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
  return {
    data: state.firestore.ordered.KIA, //database
    auth: state.firebase.auth,
    authData: state.firestore.ordered.Auth,
  };
};
export default compose(
  //database
  firestoreConnect([{ collection: "KIA" }, { collection: "Auth" }]),
  connect(mapStateToProps)
)(DataCoc);
