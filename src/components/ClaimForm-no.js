import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClaimForm() {
  const [formData, setFormData] = useState({
    procedureCode: '',
    diagnosisCode: '',
    documentationProvided: false,
    frequencyExceeded: false,
  });


const [flags, setFlags] = useState([]);


useEffect(() => {
  console.log("Updated flags:", flags);
}, [flags]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3001/validate-claim', formData);

     console.log("response: ",res.data);
     console.log("Flags raw:", res.data.flag);

    setFlags( res.data.flag);

  };

  return (
    <>
    <form onSubmit={handleSubmit} className="claim-form">
      <input
        name="procedureCode"
        placeholder="Procedure Code"
        onChange={handleChange}
      />
      <br/>
      <input
        name="diagnosisCode"
        placeholder="Diagnosis Code"
        onChange={handleChange}
      />
      <br/>
      <label>
        <input
          type="checkbox"
          name="documentationProvided"
          onChange={handleChange}
        />
        Documentation Provided
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          name="frequencyExceeded"
          onChange={handleChange}
        />
        Frequency Exceeded
      </label>
      <br/>
      <button type="submit" className="submit-btn">Validate Claim</button>
      <ul>
        {flags?.map((flag, i) => <li key={i} >{flag}</li>)}
      </ul>

    </form>
      </>
  );
}
