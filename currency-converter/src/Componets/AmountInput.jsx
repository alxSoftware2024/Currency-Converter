import React from 'react'

const AmountInput=({amount,setAmount})=>{
  return (
      /* Input for amount to be converted */
<div className='mt-4'>
        <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div> )
}

export default AmountInput