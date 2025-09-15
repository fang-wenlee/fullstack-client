import React, { useState } from 'react';
import './../index.css';
import PropTypes from 'prop-types';

function PassingCallbackToParent(props) {
  const { setFname } = props;

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

    setFname(e.target.fName.value);
    e.target.fName.value = '';
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Passing Callback to Child after enter input name and click submit button
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputError && (
          <span className="block text-sm text-red-600 font-medium">
            {inputError}
          </span>
        )}

        <input
          type="text"
          name="fName"
          placeholder="Enter Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

PassingCallbackToParent.propTypes = {
  setFname: PropTypes.func.isRequired,
};

export default PassingCallbackToParent;
