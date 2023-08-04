import React, { useState } from 'react'
import { Exchange_API_KEY,Exchange_URL} from "../../api";

const Exchange= ({ data }) => {
    const [rates,setRates]=useState(null);

    fetch(`${Exchange_URL}/latest?access_key=${Exchange_API_KEY}&symbols=${data}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    setRates(data.rates);
  
  })
  .catch(error => console.error('Error fetching data:', error));
    return (
     <div>
        {rates && <>
        {rates}
        </>}
    
     </div>
      
    );
  };
  
  export default Exchange;
  