import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

function UncontrolledForm() {
  const inputRef = useRef({
    firstName: null,
    lastName: null,
    email: null,
    company: null,
    phone: null,
  });

  const [isValid, setIsValid] = useState(null);
  const [isValidTel, setIsValidTel] = useState(null);
  const [errors, setErrors] = useState({});

  const debounceTimer = useRef(); //for email and phone validation

  //style
  const style = {
    UncontrolledFormBox: {
      maxWidth: 480,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      mx: 'auto', // margin left & margin right auto to center
      mt: 3, // margin top for 24px
      p: 3,
      border: '1px solid #ccc',
      borderRadius: 2,
      // boxShadow: 3,
      backgroundColor: '#fefefe',
    },
  };

  const handleSubmit = e => {
    e.preventDefault();

    const firstName = inputRef.current.firstName?.value.trim();
    const lastName = inputRef.current.lastName?.value.trim();
    const email = inputRef.current.email?.value.trim();
    const company = inputRef.current.company?.value.trim();
    const phone = inputRef.current.phone?.value.trim();

    const newErrors = {};

    // Basic validation
    if (!firstName) {
      newErrors.firstName = "First Name can't be empty";
    }
    if (!lastName) {
      newErrors.lastName = "Last Name can't be empty";
    }

    if (!email) {
      newErrors.email = "email can't be empty";
    }

    if (!company) {
      newErrors.company = "Company name can't be empty";
    }
    if (!phone) {
      newErrors.phone = "Phone can't be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert(`Submitted:
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Company: ${company}
        Phone: ${phone}`);
      // clear fields after submit

      // inputRef.current.firstName.value = '';
      // inputRef.current.lastName.value = '';
      // inputRef.current.email.value = '';
      // inputRef.current.company.value = '';
      // inputRef.current.phone.value = '';

      Object.values(inputRef.current).forEach(field => {
        if (field) field.value = '';
      });
    }
  };

  const validation = (type, value) => {
    if (type === 'email') {
      const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setIsValid(isValidFormat);
    }

    if (type === 'tel') {
      const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value);
      setIsValidTel(phoneRegex);
    }
  };
  const handleChange = e => {
    const { type, value } = e.target;

    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      validation(type, value);
    }, 500);
  };
  return (
    <Box sx={style.UncontrolledFormBox}>
      <h3>Uncontrolled form use ref to access DOM values </h3>
      <form id="contactForm" onSubmit={handleSubmit}>
        <input
          type="radio"
          id="type_person"
          name="type"
          value="person"
          checked
        />
        Person
        <input type="radio" id="type_company" name="type" value="company" />
        Company
        <div className="person">
          <div className="column-row">
            {errors.firstName && (
              <span style={{ color: 'red' }}>{errors.firstName}</span>
            )}{' '}
            <div className="column-label">FirstName</div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name:"
              ref={el => (inputRef.current.firstName = el)}
              // onChange={handleChange}
            />
          </div>
          <div className="column-row">
            {errors.lastName && (
              <span style={{ color: 'red' }}>{errors.lastName}</span>
            )}
            <div className="column-label">LastName</div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
              ref={el => (inputRef.current.lastName = el)}
            />
          </div>
          <div className="column-row">
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}{' '}
            {isValid === false && (
              <span style={{ color: 'red' }}>❌ Invalid email</span>
            )}
            <div className="column-label">Email:</div>
            <input
              type="email"
              id="email"
              name="email"
              ref={el => (inputRef.current.email = el)}
              placeholder="john@example.com"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="company">
          <div className="column-row">
            {errors.company && (
              <span style={{ color: 'red' }}>{errors.company}</span>
            )}{' '}
            <div className="column-label">Company</div>
            <input
              type="text"
              id="company_name"
              name="company_name"
              ref={el => (inputRef.current.company = el)}
              placeholder="Snapwiz"
            />
          </div>
          <div className="column-row">
            {errors.phone && (
              <span style={{ color: 'red' }}>{errors.phone}</span>
            )}{' '}
            {isValidTel === false && (
              <span style={{ color: 'red' }}>❌ Invalid Tel</span>
            )}
            <div className="column-label">Phone</div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="234-567-890"
              ref={el => (inputRef.current.phone = el)}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </Box>
  );
}

export default UncontrolledForm;
