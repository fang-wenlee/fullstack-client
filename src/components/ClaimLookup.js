

import { useState, useEffect} from 'react'
import axios from 'axios';




function ClaimLookup(){
    const [id, setId] = useState('');
   const [claimData, setClaimData] = useState({});
  const [inputError, setInputError] = useState()

   useEffect(() => {


   },[claimData]);

   const handleSubmit = async (e) =>{
    e.preventDefault();
     if(!id.trim()){
      setInputError('Please enter claim ID');
      return;
     }
   
      setInputError('');
       console.log("Submitted id:", id);
         // You can add further processing here, like sending the ID to a server


         try{
               const res  = await axios.get(`http://localhost:3002/lookupClaim/${id}`);
               console.log("Response:", res.data);
               setClaimData(res.data);

              

         }catch(error){
          setId("");
          console.error("Request failed:", error);
         }
   }

    return (

<>

<form onSubmit={handleSubmit}>

  {inputError && <span>{inputError}</span>}
   <input type ="text"
    placeholder="Enter id"
    value ={id}
     onChange={e =>setId(e.target.value)}
    />

    <button type="submit">Lookup Claim</button>
    </form>
    <div className="claim-details">
      {claimData && Object.keys(claimData).length >0 &&(
        <div>

          <h3>Claim Details:</h3>
          <p><strong>ID:</strong> {claimData.id}</p>
          <p><strong>Claimant:</strong> {claimData.claimant}</p>
          <p><strong>Amount:</strong> {claimData.amount}</p>
          <p><strong>Status:</strong> {claimData.status}</p>
          <p><strong>Submitted At:</strong> {claimData.submittedAt}</p>
          </div>

      ) }

    </div>
</>
    );
}
export default ClaimLookup;