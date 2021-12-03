import React, { Component } from "react";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import chartLineData from "@iconify/icons-carbon/chart-line-data";
import { connect } from "react-redux";
import { compose } from "redux";
import plusFill from "@iconify/icons-eva/plus-fill";
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
import { Link as RouterLink, Navigate } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";

class DataCocImun extends Component {
  state = {
    page: 0,
    order: "asc",
    selected: [],
    orderBy: "name",
    filterName: "",
    rowsPerPage: 5,
    isLoading: true,
  };
  render() {
    const { data, auth } = this.props;
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
        console.log(a, b, order);
        return a[1] - b[1];
      });
      if (query) {
        return filter(array, (value) => {
          return (
            value.Bulan?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Puskesmas?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Desa?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.SasaranSurvivingInfant?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.SasaranBayiBarulahir?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.BCGLastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.BCGThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.CampakRubellaLM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.CampakRubellaTM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB1LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB1ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB2LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB2ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB3LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.DPTHB3ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.HBOLessOneDLM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.HBOLessOneDTM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.HBOLessOneWLM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.HBOLessOneWTM?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.IDLLastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.IDLThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.IPVLastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.IPVThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio1LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio1ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio2LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio2ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio3LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio3ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio4LastMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            value.Polio4ThisMonth?.toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          );
        });
      }
      return stabilizedThis.map((el) => el[0]);
    }
    if (data == undefined) {
      return <div>Loading...</div>;
    } else {
      const TABEL_IMUN = [
        { id: "Bulan", label: "Bulan", alignCenter: "center" },
        { id: "Puskesmas", label: "Puskesmas", alignCenter: "center" },
        { id: "Desa", label: "Desa", alignCenter: "center" },
        {
          id: "SasaranBayiBarulahir",
          label: "Sasaran BBL",
          minWidth: 70,
          alignCenter: "center",
        },
        {
          id: "SasaranSurvivingInfant",
          label: "Sasaran SI",
          minWidth: 70,
          alignCenter: "center",
        },
        { id: "BCGLastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "BCGThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "HBOLessOneDLM", label: "Bulan Lalu", alignCenter: "center" },
        { id: "HBOLessOneDTM", label: "Bulan Ini", alignCenter: "center" },
        { id: "HBOLessOneWLM", label: "Bulan lalu", alignCenter: "center" },
        { id: "HBOLessOneWTM", label: "Bulan Ini", alignCenter: "center" },
        { id: "DPTHB1LastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "DPTHB1ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "Polio1LastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "Polio1ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "DPTHB2LastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "DPTHB2ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "Polio2ThisMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "Polio2ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "DPTHB3LastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "DPTHB3ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "Polio3ThisMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "Polio3ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "Polio4ThisMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "Polio4ThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "IPVLastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "IPVThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "CampakRubellaLM", label: "Bulan Lalu", alignCenter: "center" },
        { id: "CampakRubellaTM", label: "Bulan Ini", alignCenter: "center" },
        { id: "IDLLastMonth", label: "Bulan Lalu", alignCenter: "center" },
        { id: "IDLThisMonth", label: "Bulan Ini", alignCenter: "center" },
        { id: "" },
      ];
      //

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
      console.log(this.state, filteredUsers);

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
                  Data COC Imunisasi
                </Button>
              </div>
              <Button
                sx={{ justify: "flex-end" }}
                variant="contained"
                component={RouterLink}
                to="/dashboard/InsertData"
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
                <TableContainer sx={{ maxHeight: 800 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <UserListHead
                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      headLabel={TABEL_IMUN}
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
                            Desa,
                            Puskesmas,
                            SasaranBayiBaruLahir,
                            SasaranSurvivingInfant,
                            HBOLessOneDLM,
                            HBOLessOneDTM,
                            HBOLessOneWLM,
                            HBOLessOneWTM,
                            BCGLastMonth,
                            BCGThisMonth,
                            CampakRubellaLM,
                            CampakRubellaTM,
                            Polio1LastMonth,
                            Polio1ThisMonth,
                            DPTHB1LastMonth,
                            DPTHB1ThisMonth,
                            Polio2LastMonth,
                            Polio2ThisMonth,
                            DPTHB2LastMonth,
                            DPTHB2ThisMonth,
                            Polio3LastMonth,
                            Polio3ThisMonth,
                            DPTHB3LastMonth,
                            DPTHB3ThisMonth,
                            Polio4LastMonth,
                            Polio4ThisMonth,
                            IPVLastMonth,
                            IPVThisMonth,
                            IDLLastMonth,
                            IDLThisMonth,
                          } = row;
                          const isItemSelected =
                            this.state.selected.indexOf(Bulan) !== -1;

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
                                  onChange={(event) =>
                                    handleClick(event, Bulan)
                                  }
                                ></Checkbox>
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Puskesmas}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Desa}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {SasaranBayiBaruLahir}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {SasaranSurvivingInfant}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {BCGLastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {BCGThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {HBOLessOneDLM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {HBOLessOneDTM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {HBOLessOneWLM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {HBOLessOneWTM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB1LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB1ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB2LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB2ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB3LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {DPTHB3ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio1LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio1ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio2LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio2ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio3LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio3ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio4LastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {Polio4ThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {CampakRubellaTM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {CampakRubellaLM}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {IPVLastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {IPVThisMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {IDLLastMonth}
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
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ flexGrow: 1, textAlign: "center" }}
                                  >
                                    {IDLThisMonth}
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
                rowsPerPageOptions={[10, 25, 100]}
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
    data: state.firestore.ordered.Imunisasi, //database
    auth: state.firebase.auth,
  };
};

export default compose(
  //database
  firestoreConnect([{ collection: "Imunisasi" }]),
  connect(mapStateToProps)
)(DataCocImun);
