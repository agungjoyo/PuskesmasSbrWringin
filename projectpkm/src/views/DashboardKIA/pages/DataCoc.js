import React from "react";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import chartLineData from "@iconify/icons-carbon/chart-line-data";
// import { sentenceCase } from "change-case";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
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
import CocExemplar from "../_mocks_/CocExemplar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "monthYear", label: "Bulan", alignRight: false },
  { id: "pkm", label: "Puskesmas", alignRight: false },
  { id: "target", label: "Sasaran", alignRight: false },
  { id: "babyLive", label: "Bayi Lahir Hidup", alignRight: false },
  { id: "babyDead", label: "Bayi Lahir Mati", alignRight: false },
  { id: "kn1", label: "KN 1", alignRight: false },
  { id: "kn2", label: "KN 2", alignRight: false },
  { id: "fullKn", label: "KN Lengkap", alignRight: false },
  {
    id: "complicationNeotal",
    label: "Neonatal Komplikasi",
    alignRight: false,
  },
  { id: "perfectBaby", label: "Bayi Paripurna", alignRight: false },
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

export default function DataCoc() {
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
      const newSelecteds = CocExemplar.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CocExemplar.length) : 0;

  const filteredUsers = applySortFilter(
    CocExemplar,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

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
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
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
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={CocExemplar.length}
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
                        monthYear,
                        pkm,
                        target,
                        babyLive,
                        babyDead,
                        kn1,
                        kn2,
                        fullKn,
                        complicationNeotal,
                        perfectBaby,
                      } = row;
                      const isItemSelected = selected.indexOf(monthYear) !== -1;

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
                                handleClick(event, monthYear)
                              }
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {monthYear}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{pkm}</TableCell>
                          <TableCell align="left">{target}</TableCell>
                          <TableCell align="left">{babyLive}</TableCell>
                          <TableCell align="left">{babyDead}</TableCell>
                          <TableCell align="left">{kn1}</TableCell>
                          <TableCell align="left">{kn2}</TableCell>
                          <TableCell align="left">{fullKn}</TableCell>
                          <TableCell align="left">
                            {complicationNeotal}
                          </TableCell>
                          <TableCell align="left">{perfectBaby}</TableCell>

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
            count={CocExemplar.length}
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
