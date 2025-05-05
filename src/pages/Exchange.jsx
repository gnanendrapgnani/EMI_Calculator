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
import axios from "axios";
import { useEffect, useState } from "react";

const Exchange = () => {
  const [currency, setCurrency] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const APILink = import.meta.env.VITE_API_EXCHANGE_RATE;
      const response = await axios.get(APILink);
      setCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ marginY: "10px" }}>
      {currency ? (
        <>
          <Typography variant="h5" gutterBottom>
            Exchange Rates Based on: {currency.base_code}
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
                {Object.entries(currency.conversion_rates)
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
              count={Object.keys(currency.conversion_rates).length}
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
