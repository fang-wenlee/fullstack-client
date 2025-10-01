import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

function UncontrolledForm() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const companyRef = useRef();
  const phoneRef = useRef();
  const [errors, setErrors] = useState({});

  const debounceTimer = useRef(); //for email validation

  //style
  const style = {
    UncontrolledFormBox: {
      maxWidth: 800,
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

    const firstName = firstNameRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();
    const email = emailRef.current?.value;
    const company = companyRef.current?.value;
    const phone = phoneRef.current?.value;

    const newErrors = {};

    // Basic validation
    if (!firstName) {
      newErrors.name = "First Name can't be empty";
    }
    if (!lastName) {
      newErrors.lastName = "Last Name can't be empty";
    }

    if (!email) {
      newErrors.email = "email can't be empty";
    }

    // if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   newErrors.email = 'Invalid email format';
    // }

    if (!company) {
      newErrors.company = "Company name can't be empty";
    }
    if (!phone) {
      newErrors.phone = "Phone can't be empty";
    }

    if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Phone must be in format 123-456-7890';
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
      // Optionally clear fields
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      emailRef.current.value = '';
      companyRef.current.value = '';
      phoneRef.current.value = '';
    }
  };
  const handleChange = () => {
    setErrors('');
  };
  return (
    <Box sx={style.UncontrolledFormBox}>
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
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}{' '}
            <div className="column-label">FirstName</div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name:"
              ref={firstNameRef}
              onChange={handleChange}
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
              ref={lastNameRef}
            />
          </div>
          <div className="column-row">
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}{' '}
            <div className="column-label">Email:</div>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="john@example.com"
              onChange={() => {
                clearTimeout(debounceTimer.current);
                debounceTimer.current = setTimeout(() => {
                  const email = emailRef.current?.value.trim();
                  if (!email) {
                    setErrors(prev => ({
                      ...prev,
                      email: "Email can't be empty",
                    }));
                  } else if (
                    email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ) {
                    setErrors(prev => ({
                      ...prev,
                      email: 'Invalid email format',
                    }));
                  } else {
                    setErrors({});
                  }
                }, 500); // 500ms debounce delay
              }}
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
              ref={companyRef}
              placeholder="Snapwiz"
            />
          </div>
          <div className="column-row">
            {errors.phone && (
              <span style={{ color: 'red' }}>{errors.phone}</span>
            )}{' '}
            <div className="column-label">Phone</div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="234-567-890"
              ref={phoneRef}
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
