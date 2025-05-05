import { useState, useEffect } from "react";

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
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

    fetchExchangeRates();
  }, []);

  return exchangeRates;
};

export default useExchangeRates;
