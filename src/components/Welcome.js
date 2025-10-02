import React, { useState } from 'react';
import './../index.css';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
  container: {
    maxWidth: 540,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #fcf',
    mx: 'auto',
    mt: 3,
    p: 3,
  },
};

function PassingCallbackToParent({ setFname }) {
  const [inputError, setInputError] = useState('');

  const handleSubmit = e => {
    const value = e.target.fName.value;

    e.preventDefault();
    if (!value.trim()) {
      setInputError('Please enter a name');
      return;
    }

    //  if (/^[a-zA-Z\s]*$/.test(value) && typeof value === 'string') {

    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setInputError('Name can only contain letters and spaces');
      return;
    }

    setInputError('');

    setFname(value);
  };

  return (
    <Box sx={style.container}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Passing setName callback to Child from Parent
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}

        <input type="text" name="fName" placeholder="Enter Name" />

        <button type="submit">Submit</button>
      </form>
    </Box>
  );
}

PassingCallbackToParent.propTypes = {
  setFname: PropTypes.func.isRequired,
};

export default PassingCallbackToParent;
