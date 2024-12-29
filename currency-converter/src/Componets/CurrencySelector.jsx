import React from 'react'
import { IoMdStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
const CurrencySelector =({currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = "",})=> 
    {
     // Function to check if a currency is marked as a favorite
    const isFavorite = (curr) => favorites.includes(curr);

    // Extract country code (first two characters of the currency code) to display the flag
    const countrycode = currency.substring(0, 2);

    return (
        <div>
            {/* Label for the dropdown */}
            <label
                htmlFor={title}
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>

            <div className="mt-1 relative">
                {/* Display the flag for the selected currency */}
                <img
                    src={`https://flagsapi.com/${countrycode}/flat/64.png`} // Flag image URL based on currency's country code
                    alt='flag'
                    className="absolute right-5 h-11 pr-7 pb-0 flex items-center text-sm leading-5"
                />

                {/* Dropdown for selecting a currency */}
                <select
                    value={currency} // The selected currency is controlled by the 'currency' state
                    onChange={(e) => setCurrency(e.target.value)} // Update the selected currency when user selects a different one
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {/* Rendering favorite currencies first */}
                    {favorites.map((currency) => {
                        return (
                            <option className="bg-gray-200" value={currency} key={currency}>
                                {currency} {/* Display the currency */}
                            </option>
                        );
                    })}
                    <hr /> 
                    {/* Divider to separate favorites from the rest of the currencies */}

                    {/* Rendering non-favorite currencies */}
                    {currencies
                        .filter((c) => !favorites.includes(c)) // Filter out favorites from the list
                        .map((currency) => {
                            return (
                                <option value={currency} key={currency}>
                                    {currency} {/* Display the currency */}
                                </option>
                            );
                        })}
                </select>

                {/* Button to add/remove currency to/from favorites */}
                <button
                    onClick={() => handleFavorite(currency)} // Toggle favorite status when clicked
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
                >
                    {/* Display a filled star if the currency is a favorite, otherwise show an outline star */}
                    {isFavorite(currency) ? <IoStar /> : <IoMdStarOutline />}
                </button>
            </div>
        </div>
    );
}

export default CurrencySelector;