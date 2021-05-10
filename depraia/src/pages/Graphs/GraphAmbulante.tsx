import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import MenuGraphs from "./MenuGraphs";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "../Admin/index.scss";
import PraiaService from "../../service/PraiaService";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

interface Column {
  id: "praia" | "ambulante" | "produto";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "praia", label: "Praia", minWidth: 170 },
  { id: "ambulante", label: "Ambulante", minWidth: 100 },
  { id: "produto", label: "Produto", minWidth: 100 }
];

const GraphAmbulante: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [expectedObj, setExpectedObj] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    async function fetchPraias() {
      const praias = await PraiaService.getAll();
      var expectedObj: any[] = [];

      console.log(praias);

      praias.map((response: any) => {
        console.log(praias);
        const praia = response.ambulantes.map(
          (ambulante: { user: any; produto: any[] }) => ({
            praia: response.nome,
            ambulante: ambulante.user.nome,
            produto:
              ambulante.produto !== undefined
                ? ambulante.produto.map((p) => {
                    return p.nome;
                  })
                : ` O ${ambulante.user.nome} não tem produtos cadastros`
          })
        );
        praia.map((obj: any) => {
          expectedObj.push(obj);
        });

        setExpectedObj(expectedObj);
      });
    }
    fetchPraias();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuGraphs />
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Ambulantes nas Praias</h1>
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
                    {expectedObj &&
                      expectedObj
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
                                    {value}
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
                count={expectedObj.length}
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
};

export default GraphAmbulante;
