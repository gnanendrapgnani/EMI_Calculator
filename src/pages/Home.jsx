import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

const Home = () => {
  const [fields, setFields] = useState({
    amount: "",
    rate: "",
    term: "",
  });

  const [touched, setTouched] = useState({
    amount: false,
    rate: false,
    term: false,
  });

  const [emi, setEmi] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [convertedEmi, setConvertedEmi] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [schedule, setSchedule] = useState([]);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isError = (field) => {
    if (!touched[field]) return false;
    const value = fields[field].trim();

    if (field === "term") {
      const termVal = parseFloat(value);
      return value === "" || isNaN(termVal) || termVal < 1 || termVal > 30;
    }

    return value === "";
  };

  const getHelperText = (field) => {
    if (!touched[field]) return " ";
    const value = fields[field].trim();

    if (field === "term") {
      const termVal = parseFloat(value);
      if (value === "") return "Required";
      if (termVal > 30) return "Term must be less than or equal to 30";
      if (termVal < 1) return "Term must be greater than or equal to 1";
    }

    return value === "" ? "Required" : " ";
  };

  const calculateEMI = () => {
    const P = parseFloat(fields.amount);
    const R = parseFloat(fields.rate) / 12 / 100;
    const N = parseFloat(fields.term) * 12;

    if (!P || !R || !N) {
      setEmi(null);
      return;
    }

    const monthlyEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setEmi(monthlyEmi.toFixed(2));

    // Amortization schedule
    const scheduleArr = [];
    let balance = P;

    for (let month = 1; month <= N; month++) {
      const interest = balance * R;
      const principal = monthlyEmi - interest;
      balance -= principal;

      scheduleArr.push({
        month,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: Math.max(balance, 0).toFixed(2),
      });
    }

    setSchedule(scheduleArr);
  };

  const fetchExchangeRates = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_EXCHANGE_RATE);
      const data = await res.json();
      if (data && data.conversion_rates) {
        setExchangeRates(data.conversion_rates);
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates", error);
    }
  };

  const resetTable = () => {
    setFields({ amount: "", rate: "", term: "" });
    setTouched({ amount: false, rate: false, term: false });
    setEmi(null);
    setConvertedEmi(null);
    setSchedule([]);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (emi && exchangeRates[currency]) {
      const converted = (parseFloat(emi) * exchangeRates[currency]).toFixed(2);
      setConvertedEmi(converted);
    }
  }, [emi, currency, exchangeRates]);

  return (
    <Container sx={{ marginY: "10px" }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Loan Calculator Dashboard
        </Typography>
      </Box>
      <Box>
        <Box display="flex" alignItems="flex-start" gap="10px" flexWrap="wrap">
          <TextField
            name="amount"
            label="Loan Amount"
            variant="outlined"
            type="number"
            value={fields.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError("amount")}
            helperText={getHelperText("amount")}
          />
          <TextField
            name="rate"
            label="Interest Rate (%)"
            variant="outlined"
            type="number"
            value={fields.rate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError("rate")}
            helperText={getHelperText("rate")}
          />
          <TextField
            name="term"
            label="Term (Years)"
            variant="outlined"
            type="number"
            value={fields.term}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError("term")}
            helperText={getHelperText("term")}
          />
        </Box>
        <Button
          variant="contained"
          onClick={calculateEMI}
          sx={{ height: "56px" }}
        >
          Calculate
        </Button>
      </Box>

      {emi && (
        <Box mt={3}>
          <Typography variant="h6">Monthly EMI: ${emi}</Typography>
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              size="small"
            >
              {Object.keys(exchangeRates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
            <Typography>
              Converted EMI: {convertedEmi} {currency}
            </Typography>
          </Box>

          {schedule.length > 0 && (
            <Box mt={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="h6">
                  Amortization Schedule ({currency})
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetTable}
                >
                  RESET TABLE
                </Button>
              </Box>
              <Paper sx={{ overflow: "auto", maxHeight: 300 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Principal</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell>Remaining Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>
                          {parseFloat(item.principal).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell>
                          {parseFloat(item.interest).toFixed(2)} {currency}
                        </TableCell>
                        <TableCell>
                          {parseFloat(item.balance).toFixed(2)} {currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Home;
