const Amount = ({ amount }) => {
    // if (typeof amount !== 'number') {
    //   throw new TypeError('Amount must be a number');
    // }
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2, 
      minimumFractionDigits: 0,
      style: 'currency',
    currency: 'INR',
    }).format(amount);
  
    return formattedAmount;
  };
  
  export default Amount;