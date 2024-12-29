import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { MdCompareArrows } from "react-icons/md";// Import the compare icon
import CurrencySelector from './CurrencySelector'
import AmountInput from './AmountInput'
import ConversionResult from './ConversionResult'
const CurrencyConverter=()=>{
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
 // Function to convert currency
 const convertCurrency = async () => {
    if (!amount) return; // If amount is invalid, don't proceed
    setConverting(true); // Set converting state to true when starting the conversion
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      // Update converted amount with result from the API
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error); // Error handling
    } finally {
      setConverting(false); // Set converting state to false after conversion
    }
  };
   // Handle favorite currency toggle (add/remove from favorites)
   const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency); // Remove from favorites
    } else {
      updatedFavorites.push(currency); // Add to favorites
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Store updated favorites in localStorage
  };
  // Swap 'from' and 'to' currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-inherit">
    <h2 className='mb-5 text-2xl font-medium text-center text-indigo-600'>
        CURRENCY CONVERTER
      </h2>
      {/* Currency selection dropdowns for from and to currencies */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencySelector
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
         {/* Swap currencies button */}
         <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <MdCompareArrows className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencySelector
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          handleFavorite={handleFavorite}
        />
        </div>
        <AmountInput 
        amount={amount}
        setAmount={setAmount}>

        </AmountInput>
             {/* Button to trigger currency conversion */}
      <div className="flex justify-center mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Get Exchange Rate
        </button>
      </div>
      <ConversionResult
      convertedAmount={convertedAmount}
      setConvertedAmount={setConvertedAmount}
      >

      </ConversionResult>
 </div>
  )
}

export default CurrencyConverter