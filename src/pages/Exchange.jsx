import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import useExchangeRates from "../hooks/useExchangeRates";

const Exchange = () => {
  const exchangeRates = useExchangeRates();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const baseCurrency = "USD";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currencies = Object.entries(exchangeRates);

  return (
    <Container sx={{ marginY: "10px" }}>
      {currencies.length > 0 ? (
        <>
          <Typography variant="h5" gutterBottom>
            Exchange Rates Based on: {baseCurrency}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Currency</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Rate</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currencies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(([code, rate]) => (
                    <TableRow key={code}>
                      <TableCell>{code}</TableCell>
                      <TableCell>{rate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={currencies.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </TableContainer>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default Exchange;
