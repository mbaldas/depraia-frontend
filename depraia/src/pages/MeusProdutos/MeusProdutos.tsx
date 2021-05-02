import "./index.scss";
import NavBar from "../../components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MenuMeusProdutos from "./MenuMeusProdutos";
import ProdutoService from "../../service/ProdutoService";
import { Produto } from "../../model/Produto";

interface Column {
  id: 'nome' | 'descricao' | 'preco';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'descricao', label: 'Descrição', minWidth: 100 },
  {
    id: 'preco',
    label: 'Preço',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function MeusProdutos() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    async function fetchProdutos() {
      const response = await ProdutoService.getAll();
      setProdutos(response);
    }
    fetchProdutos();
  }, []);




  return (
    <>
      <NavBar />
      <div className="container--produtos">
        <MenuMeusProdutos />
          <div className="right--produtos">
            <div className="container--right__produtos">
              <h1 className="font--black"  style={{marginBottom:"50px"}}>Meus Produtos</h1>
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
                        {produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.descricao}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
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
                    count={produtos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    style={{marginBottom:"50px"}}
                  />
              </Paper>
            </div>
          </div>
      </div>
    </>
  );
}
