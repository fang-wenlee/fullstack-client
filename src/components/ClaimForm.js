import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ClaimForm.module.css';

const validProcedureCodes = [
  'D0120', 'D0140', 'D0150', 'D0210', 'D0330',
  'D1110', 'D1206', 'D1351',
  'D2140', 'D2330', 'D2740',
  'D3310', 'D3346',  'D4341',
  'D7140', 'D7210'
];
export default function ClaimForm() {
  const [formData, setFormData] = useState({
    procedureCode: '',
    diagnosisCode: '',
    documentationProvided: false,
    frequencyExceeded: false,
  });

  //the flag state is hold the response  from the server for the claim validation
  const [flags, setFlags] = useState([]);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
   // console.log("Updated flags:", flags);
  }, [flags]);





  const handleChange = (e) => {
    

setFlags([]);

    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!formData.procedureCode.trim()) {
    setInputError('Procedure Code is required.');
    return;
  }
   if (!validProcedureCodes.includes(formData.procedureCode)) {
  setInputError('Invalid procedure code.');
  return;
}
  setInputError(''); // Clear any previous error

                try{
                    const res = await axios.post('http://localhost:3002/validate-claim', formData);
                    console.log("response: ", res.data);
                    console.log("Flags raw:", res.data.flag);
                    setFlags(res.data.flag);
                }catch(error){
                    console.error("Validation request failed:", error);
                    setInputError('Server error. Please try again later.');
                }
  };

  return (

    <div className={styles.ClaimFormContainer}>

 <form onSubmit={handleSubmit} className={styles.claimForm}>
     {inputError && <span className={styles.errorText}>{inputError}</span>}
     
      <input
        name="procedureCode"
        placeholder="Procedure Code"
        onChange={handleChange}
        className={styles.inputField}
      />

      <br />
      <input
        name="diagnosisCode"
        placeholder="Diagnosis Code"
        onChange={handleChange}
        className={styles.inputField}
      />
      <br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="documentationProvided"
          onChange={handleChange}
        />
        Documentation Provided
      </label>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="frequencyExceeded"
          onChange={handleChange}
        />
        Frequency Exceeded
      </label>
      <br />
      <button type="submit" className={styles.submitBtn}>Validate Claim</button>
      <ul className={styles.flagList}>
        {flags?.map((flag, index) => (
          <li key={index} className={styles.flagItem}>{flag}</li>
        ))}
      </ul>
    </form>

 </div>

  );



   
   
}
