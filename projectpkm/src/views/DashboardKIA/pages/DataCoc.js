import React from "react";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import chartLineData from "@iconify/icons-carbon/chart-line-data";
// import { sentenceCase } from "change-case";
import { useState } from "react";
import { connect } from "react-redux";
import plusFill from "@iconify/icons-eva/plus-fill";
import { compose } from "redux";
import { Link as RouterLink } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
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

const TABLE_HEAD = [
  { id: "Bulan", label: "Bulan", alignCenter: "center" },
  { id: "Puskesmas", label: "Puskesmas", alignCenter: "center" },
  { id: "Sasaran", label: "Sasaran", alignCenter: "center" },
  { id: "BayiLahirHidup", label: "Bayi Lahir Hidup", alignCenter: "center" },
  { id: "BayiLahirMati", label: "Bayi Lahir Mati", alignCenter: "center" },
  { id: "kn1", label: "KN 1", alignCenter: "center" },
  { id: "kn2", label: "KN 2", alignCenter: "center" },
  { id: "fullKn", label: "KN Lengkap", alignCenter: "center" },
  {
    id: "complicationNeotal",
    label: "Neonatal Komplikasi",
    alignCenter: "center",
  },
  { id: "BayiParipurna", label: "Bayi Paripurna", alignCenter: "center" },
  { id: "" },
];

// ----------------------------------------------------------------------

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
    return filter(
      array,
      (_user) =>
        _user.monthYear.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function DataCoc(datacoc) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = datacoc.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datacoc.data.length) : 0;

  const filteredUsers = applySortFilter(
    datacoc.data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  console.log(datacoc.data);
  return (
    <Page title="Data CoC | Minimal-UI">
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <div style={{ pointerEvents: "none" }}>
            <Button
              sx={{ fontSize: 20, cursor: "none" }}
              variant="outline"
              startIcon={<Icon icon={chartLineData} />}
            >
              {/* <Icon icon={chartLineData} width="30" height="30" /> */}
              DataCoc
            </Button>
          </div>
          <Button
            sx={{ justify: "flex-end" }}
            variant="contained"
            component={RouterLink}
            to="/dashboard/InsertData"
            startIcon={<Icon icon={plusFill} />}
          >
            New Data
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ tableLayout: "auto" }}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={datacoc.data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        Bulan,
                        Puskesmas,
                        Sasaran,
                        BayiHidup,
                        BayiMati,
                        kn1,
                        kn2,
                        fullKn,
                        complicationNeotal,
                        BayiParipurna,
                      } = row;
                      const isItemSelected = selected.indexOf(Bulan) !== -1;

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
                              onChange={(event) => handleClick(event, Bulan)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
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
                                {Sasaran}
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
                                {BayiHidup}
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
                                {BayiMati}
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
                                {kn1}
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
                                {kn2}
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
                                {fullKn}
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
                                {complicationNeotal}
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
                                {BayiParipurna}
                              </Typography>
                            </Stack>
                          </TableCell>

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
                        <SearchNotFound searchQuery={filterName} />
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
            count={datacoc.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    data: state.firestore.ordered.KIA,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "KIA" }])
)(DataCoc);
