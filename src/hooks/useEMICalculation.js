import { useState } from "react";

const useEMICalculation = (amount, rate, term) => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(term) * 12;

    if (!P || !R || !N) {
      setEmi(null);
      return;
    }

    const monthlyEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(monthlyEmi.toFixed(2));

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

  return { emi, schedule, calculateEMI };
};

export default useEMICalculation;
