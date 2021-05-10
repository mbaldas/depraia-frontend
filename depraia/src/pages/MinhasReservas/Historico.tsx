import "./index.scss";
import MenuMinhasReservas from "./MenuMinhasReservas";
import NavBar from "../../components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PraiaService from "../../service/PraiaService";
import { useLocalStorage } from "../../hooks/localStorage";
import User from "../../model/User";
import AgendaService from "../../service/AgendaService";

interface Column {
  id: "praia" | "data" | "vagas";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "praia", label: "Praia", minWidth: 170 },
  { id: "data", label: "Data", minWidth: 100 },
  {
    id: "vagas",
    label: "Vagas",
    minWidth: 170,
    align: "right"
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export default function Historico() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [agendas, setAgendas] = useState<any[]>([]);
  const [actualUser, setActualUser] = useLocalStorage("name", "");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  useEffect(() => {
    async function fetchAgendas() {
      const agenda = await AgendaService.getReservasPorUsuario(actualUser.id);
      const a = agenda.map((agenda: any) => ({
        praia: agenda.praia.nome,
        data: agenda.data,
        vagas: agenda.vagas,
      }))
      //.filter(
       // (agenda: { data: string }) => new Date(agenda.data) < new Date())
        setAgendas(a);
       
    }
    fetchAgendas();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container--reservas">
        <MenuMinhasReservas />
        <div className="right--reservas">
          <div className="container--right__reservas">
            <h1 className="font--black" style={{ marginBottom: "50px" }}>
              Histórico
            </h1>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agendas.length > 0 &&
                      agendas
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.data}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
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
                count={agendas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{ marginBottom: "50px" }}
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
