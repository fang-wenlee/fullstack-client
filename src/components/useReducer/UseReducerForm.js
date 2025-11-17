import React, { useReducer } from 'react';
import { Box } from '@mui/material';

const initialState = {
  name: '',
  address: '',
  payment: '',
  errors: {},
  isSubmitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }, // clear error on change
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'SUBMIT':
      return { ...state, isSubmitted: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const style = {
  SimpleCounterBox: {
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

function CheckoutForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = e => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const validate = () => {
    let valid = true;
    if (!state.name) {
      dispatch({
        type: 'SET_ERROR',
        field: 'name',
        message: 'Name is required',
      });
      valid = false;
    }
    if (!state.address) {
      dispatch({
        type: 'SET_ERROR',
        field: 'address',
        message: 'Address is required',
      });
      valid = false;
    }
    if (!state.payment) {
      dispatch({
        type: 'SET_ERROR',
        field: 'payment',
        message: 'Payment method is required',
      });
      valid = false;
    }
    return valid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: 'SUBMIT' });

      console.log('Form submitted:', state);

      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 3000);
    }
  };

  return (
    <Box sx={style.SimpleCounterBox}>
      <h2>Checkout Form with useReducer</h2>
      <form onSubmit={handleSubmit}>
        {state.errors.name && (
          <span style={{ color: 'red' }}>{state.errors.name}</span>
        )}
        <input
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Full Name"
        />{' '}
        <br />
        {state.errors.address && (
          <span style={{ color: 'red' }}>{state.errors.address}</span>
        )}
        <input
          name="address"
          value={state.address}
          onChange={handleChange}
          placeholder="Shipping Address"
        />{' '}
        <br />
        {state.errors.payment && (
          <span style={{ color: 'red' }}>{state.errors.payment}</span>
        )}
        <select name="payment" value={state.payment} onChange={handleChange}>
          <option value="">Select Payment</option>
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>{' '}
        <br />
        <button type="submit">Checkout</button>
        {state.isSubmitted && <p>Thank you for your order!</p>}
      </form>
    </Box>
  );
}

export default CheckoutForm;
