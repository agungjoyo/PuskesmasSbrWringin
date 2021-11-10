import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "desa", label: "Desa", minWidth: 100 },
  {
    id: "bbl",
    label: "BBL",
    minWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "si",
    label: "SI",
    minWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "blnlalu",
    label: "Bulan Lalu",
    minWidth: 80,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "blnini",
    label: "Bulan Ini",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "kum",
    label: "Kumulatif",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "blnlalu",
    label: "Bulan Lalu",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "blnini",
    label: "Bulan Ini",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "kum",
    label: "Kumulatif",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(no, code, population, size) {
  const density = population / size;
  return { no, code, population, size, density };
}

const rows = [createData("India", "IN", 1324171354, 3287263)];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}></TableCell>
              <TableCell align="center" colSpan={3}>
                Sasaran
              </TableCell>
              <TableCell align="center" colSpan={4}>
                HBO KURANG 24 JAM
              </TableCell>
              <TableCell align="center" colSpan={5}>
                HBO 0-7 HARI
              </TableCell>
              <TableCell align="center" colSpan={6}>
                BCG
              </TableCell>
              <TableCell align="center" colSpan={7}>
                POLIO 1
              </TableCell>
              <TableCell align="center" colSpan={8}>
                DPT-HB 1
              </TableCell>
              <TableCell align="center" colSpan={9}>
                POLIO 2
              </TableCell>
              <TableCell align="center" colSpan={10}>
                DPT-HB 2
              </TableCell>
              <TableCell align="center" colSpan={11}>
                POLIO 3
              </TableCell>
              <TableCell align="center" colSpan={12}>
                DPT-HB 3
              </TableCell>
              <TableCell align="center" colSpan={13}>
                POLIO 4
              </TableCell>
              <TableCell align="center" colSpan={14}>
                IPV
              </TableCell>
              <TableCell align="center" colSpan={15}>
                CAMPAK-RUBELLA
              </TableCell>
              <TableCell align="center" colSpan={16}>
                IDL
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
