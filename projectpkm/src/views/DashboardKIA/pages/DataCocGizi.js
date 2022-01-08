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
  UserMoreMenuGizi,
} from "../components/_dashboard/user";
//

// ----------------------------------------------------------------------

class DataCocGizi extends Component {
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
    if (Position == "KIA" || Position == "Imunisasi")
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
        console.log(a, b, order);
        return a[1] - b[1];
      });
      if (query) {
        return filter(array, (value) => {
          return (
            value.Bulan?.toLowerCase().includes(query.toLowerCase()) ||
            value.Puskesmas?.toLowerCase().includes(query.toLowerCase()) ||
            value.JumlahBalitaKMS?.toLowerCase().includes(
              query.toLowerCase()
            ) ||
            value.JumlahBadutaLess23Bln?.toLowerCase().includes(
              query.toLowerCase()
            ) ||
            value.JmlBalitaLess2359Bln?.toLowerCase().includes(
              query.toLowerCase()
            ) ||
            value.JmlBalitaLess59Bln?.toLowerCase().includes(
              query.toLowerCase()
            ) ||
            value.JmlBalitaNaikBB?.toLowerCase().includes(
              query.toLowerCase()
            ) ||
            value.JmlSPDK?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlPDK?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlTNM?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlTG?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlGibur?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlGirang?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlNML?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlRGzLbh?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlGzLbh?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlGzLbh?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlGzLbh?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlObes?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBBSK?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBBK?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBBN?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBBL?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBMLA?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlBMKEK?.toLowerCase().includes(query.toLowerCase()) ||
            value.JmlPMTKEK?.toLowerCase().includes(query.toLowerCase()) ||
            value.Tahun?.toString().toLowerCase().includes(query.toLowerCase())
          );
        });
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
        {
          id: "JumlahBalitaKMS",
          label: "Jumlah Balita KMS",
          alignCenter: "center",
        },
        {
          id: "JumlahBadutaLess23Bln",
          label: " Jumlah baduta (0-23 bln) yang ditimbang",
          alignCenter: "center",
        },
        {
          id: "JmlBalitaLess2359Bln",
          label: "Jumlah balita (24-59 bln) yang ditimbang",
          alignCenter: "center",
        },
        {
          id: "JmlBalitaLess59Bln",
          label: "Jumlah balita (0-59 bln) yang ditimbang",
          alignCenter: "center",
        },
        {
          id: "JmlBalitaNaikBB",
          label: "Jumlah Balita Naik BB",
          alignCenter: "center",
        },
        {
          id: "JmlSPDK",
          label: "Jumlah S.PDK",
          alignCenter: "center",
        },
        {
          id: "JmlPDK",
          label: "Jumlah PDK",
          alignCenter: "center",
        },
        {
          id: "JmlTNM",
          label: "Jumlah TNM",
          alignCenter: "center",
        },
        {
          id: "JmlTG",
          label: "Jumlah TG",
          alignCenter: "center",
        },
        {
          id: "JmlGibur",
          label: "Jumlah Gibur",
          alignCenter: "center",
        },
        {
          id: "JmlGirang",
          label: "Jumlah Girang",
          alignCenter: "center",
        },
        {
          id: "JmlNML",
          label: "Jumlah NML",
          alignCenter: "center",
        },
        {
          id: "JmlRGzLbh",
          label: "Jumlah RGzLbh",
          alignCenter: "center",
        },
        {
          id: "JmlGzLbh",
          label: "Jumlah GzLbh",
          alignCenter: "center",
        },
        {
          id: "JmlObes",
          label: "Jumlah Obes",
          alignCenter: "center",
        },
        {
          id: "JmlBBSK",
          label: "Jumlah BBSK",
          alignCenter: "center",
        },
        {
          id: "JmlBBK",
          label: "Jumlah BBK",
          alignCenter: "center",
        },
        {
          id: "JmlBBN",
          label: "Jumlah BBN",
          alignCenter: "center",
        },
        {
          id: "JmlBBL",
          label: "Jumlah BBL",
          alignCenter: "center",
        },
        {
          id: "JmlBMLA",
          label: "Jumlah BMLA",
          alignCenter: "center",
        },
        {
          id: "JmlBMKEK",
          label: "Jumlah BMKEK",
          alignCenter: "center",
        },
        {
          id: "JmlPMTKEK",
          label: "Jumlah PMTKEK",
          alignCenter: "center",
        },
        { id: "" },
      ];

      // ----------------------------------------------------------------------

      const handleRequestSort = (event, property) => {
        const isAsc =
          this.state.orderBy === property && this.state.order === "asc";
        // this.state.orderBy(isAsc ? "desc" : "asc");
        const orderBy = isAsc ? "desc" : "asc";
        console.log(orderBy);
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
      console.log(this.state, filteredUsers);
      return (
        <Page title="Data Gizi| Minimal-UI">
          <Container>
            <Stack direction="row" justifyContent="space-between" mb={5}>
              <div style={{ pointerEvents: "none" }}>
                <Button
                  sx={{ fontSize: 20, cursor: "none" }}
                  variant="outline"
                  startIcon={<Icon icon={chartLineData} />}
                >
                  {/* <Icon icon={chartLineData} width="30" height="30" /> */}
                  Data Gizi
                </Button>
              </div>
              <Button
                sx={{ justify: "flex-end" }}
                variant="contained"
                component={RouterLink}
                to="/dashboard/InsertDataGizi"
                startIcon={<Icon icon={plusFill} />}
              >
                Tambah Data
              </Button>
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
                            JumlahBalitaKMS,
                            JumlahBadutaLess23Bln,
                            JmlBalitaLess2359Bln,
                            JmlBalitaLess59Bln,
                            JmlBalitaNaikBB,
                            JmlSPDK,
                            JmlPDK,
                            JmlTNM,
                            JmlTG,
                            JmlGibur,
                            JmlGirang,
                            JmlNML,
                            JmlRGzLbh,
                            JmlGzLbh,
                            JmlObes,
                            JmlBBSK,
                            JmlBBK,
                            JmlBBN,
                            JmlBBL,
                            JmlBMLA,
                            JmlBMKEK,
                            JmlPMTKEK,
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
                                    {JumlahBalitaKMS}
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
                                    {JumlahBadutaLess23Bln}
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
                                    {JmlBalitaLess2359Bln}
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
                                    {JmlBalitaLess59Bln}
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
                                    {JmlBalitaNaikBB}
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
                                    {JmlSPDK}
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
                                    {JmlPDK}
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
                                    {JmlTNM}
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
                                    {JmlTG}
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
                                    {JmlGibur}
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
                                    {JmlGirang}
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
                                    {JmlNML}
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
                                    {JmlRGzLbh}
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
                                    {JmlGzLbh}
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
                                    {JmlObes}
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
                                    {JmlBBSK}
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
                                    {JmlBBK}
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
                                    {JmlBBN}
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
                                    {JmlBBL}
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
                                    {JmlBMLA}
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
                                    {JmlBMKEK}
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
                                    {JmlPMTKEK}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="right">
                                <UserMoreMenuGizi />
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
                rowsPerPageOptions={[6, 50, 100]}
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
    data: state.firestore.ordered.Gizi, //database
    auth: state.firebase.auth,
    authData: state.firestore.ordered.Auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Gizi" }, { collection: "Auth" }]),
  connect(mapStateToProps)
)(DataCocGizi);
