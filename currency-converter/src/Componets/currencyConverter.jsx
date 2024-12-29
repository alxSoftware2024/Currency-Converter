import React from 'react'
import React, { useState, useEffect } from 'react'; // Import necessary React hooks
const currencyConverter=()=>{
      // Declare state variables
  const [currencies, setCurrencies] = useState([]); // To hold all available currencies
  const [amount, setAmount] = useState(1); // Amount to be converted
  const [fromCurrency, setFromCurrency] = useState("USD"); // The currency to convert from
  const [toCurrency, setToCurrency] = useState("INR"); // The currency to convert to
  const [convertedAmount, setConvertedAmount] = useState(null); // Converted amount after fetching
  const [converting, setConverting] = useState(false); // Indicates if a conversion is in progress
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  ); // Favorite currencies saved in localStorage, or default to INR, EUR
 // Fetch list of available currencies from the API
 const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data)); // Store available currencies
    } catch (error) {
      console.error("Error Fetching", error); // Error handling
    }
  };

  // Fetch the currencies on initial load
  useEffect(() => {
    fetchCurrencies();
  }, []);
 
  return (
    <div>currencyConverter</div>
  )
}

export default currencyConverter