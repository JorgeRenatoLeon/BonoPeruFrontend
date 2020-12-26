import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

const Tabla = (props) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const orderAux = comparator(a[0], b[0]);
            if (orderAux !== 0) return orderAux;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderByAux) {
        if (b[orderByAux] < a[orderByAux]) {
          return -1;
        }
        if (b[orderByAux] > a[orderByAux]) {
          return 1;
        }
        return 0;
    }

    function getComparator(orderAux, orderByAux) {
        return orderAux === 'desc'
          ? (a, b) => descendingComparator(a, b, orderByAux)
          : (a, b) => -descendingComparator(a, b, orderByAux);
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: "5AB9EA",
          color: theme.palette.common.black,
        },
        body: {
          fontSize: 18,
        },
    }))(TableCell);

    function EnhancedTableHead(propsAux) {
        const {  orderAux, orderByAux, onRequestSort } = propsAux;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
        const headCellsAux = props.headCell
        return (
          <TableHead>
            <TableRow>
              {headCellsAux.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderByAux === headCell.id ? orderAux : false}
                  style={{ background: '#5AB9EA' }}
                >
                  <TableSortLabel
                    active={orderByAux === headCell.id}
                    direction={orderByAux === headCell.id ? orderAux : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderByAux === headCell.id ? (
                      <span>
                        {orderAux === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
        );
    }

    

    return ( 
        <Grid>
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(props.columnas, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
    
                            return (
                                <TableRow hover tabIndex={-1} key={index}>
                                  {props.cabeceras.map((cabecera, indexAux)=>{
                                    return (
                                      cabecera.especial?
                                        (cabecera.valor==='masculino'?
                                        <TableCell key={indexAux} align="left">{row[cabecera.valor]===1?cabecera.verdadero:cabecera.falso}</TableCell>
                                        :
                                        <TableCell key={indexAux} align="left">{row[cabecera.valor]?cabecera.verdadero:cabecera.falso}</TableCell>)
                                      :
                                        (cabecera.compuesto?
                                        <TableCell key={indexAux} align="left">{row[cabecera.valor][cabecera.segundo]}</TableCell>
                                        :
                                        <TableCell key={indexAux} align="left">{row[cabecera.valor]}</TableCell>)
                                    )
                                  })}
                                </TableRow>
                            );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, { value: -1, label: 'Todo' }]}
                component="div"
                count={props.columnas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Grid>
    );
}
 
export default Tabla;