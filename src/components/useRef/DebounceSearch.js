import React, { useState, useRef } from 'react';

import { Box } from '@mui/material';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
};

function ControledForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [isValid, setIsValid] = useState(null);
  const [isValidTel, setIsValidTel] = useState(null);
  const [errors, setErrors] = useState({});
  const debounceTimer = useRef(null);

  const style = {
    formContainer: {
      maxWidth: 500,
      display: 'flex',
      flexDirection: 'column',
      mx: 'auto',
      mt: 3,
      p: 5,
      border: '1px solid #ddd',
      borderRadius: 2,
      backgroundColor: '#fefefe',
    },
  };

  const validation = (type, value) => {
    console.log(type, value);
    if (type === 'email') {
      const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setIsValid(isValidFormat);
    } else if (type === 'tel') {
      const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value);
      setIsValidTel(phoneRegex);
    }
  };

  const handleChange = e => {
    const { name, value, type } = e.target;

    console.log(e.target);
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      validation(type, value);
    }, 500);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name can't be empty";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name can't be empty";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "phone can't be empty";
    } else if (!isValidTel) {
      return;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email can't be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert(
        `Submitted Data:
         Your Name: ${formData.firstName} ${formData.lastName} 
         Email: ${formData.email}
         Phone: ${formData.phone}
        `
      );

      setFormData(initialFormData);
      setIsValid(null);
      setErrors({});
    }
  };

  return (
    <Box sx={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
        />
        {errors.firstName && (
          <span style={{ color: 'red' }}>❌{errors.firstName}</span>
        )}
        <br />

        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
        />
        {errors.firstName && (
          <span style={{ color: 'red' }}> ❌{errors.lastName}</span>
        )}
        <br />

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="123-456-7890"
        />
        {errors.phone && <span style={{ color: 'red' }}>❌{errors.phone}</span>}
        {isValidTel === false && (
          <span style={{ color: 'red' }}>❌ Invalid Phone number</span>
        )}
        <br />

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <span style={{ color: 'red' }}>❌{errors.email}</span>}
        {/* {isValid === true && <p style={{ color: 'green' }}>✅ Valid email</p>} */}
        {isValid === false && (
          <span style={{ color: 'red' }}>❌ Invalid email</span>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>
    </Box>
  );
}

export default ControledForm;
