import React from 'react'

const ConversionResult=({setConvertedAmount,convertedAmount}) =>{
  return (
  <>
  {/* Display the converted amount if it exists */}
      {convertedAmount && (
      <div className="mt-4 text-lg font-medium text-right text-indigo-600">
        Converted Amount: {convertedAmount}
      </div>
    )} 
  </>
 )
}

export default ConversionResult