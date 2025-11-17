import React, { useReducer } from 'react';
import { Box, Button } from '@mui/material';

const initialState = { count: 0 };

function reducerFn(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducerFn, initialState);

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
    btn: {
      marginTop: '10px',
      marginBottom: '10px',
      width: '100px',
    },
    btnContainer: {
      display: 'flex',
      gap: '10px',
    },
  };

  return (
    <Box sx={style.SimpleCounterBox}>
      <p>Count: {state.count}</p>
      <Box sx={style.btnContainer}>
        <Button
          sx={style.btn}
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: 'decrement' })}
        >
          -
        </Button>
        <Button
          sx={style.btn}
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: 'increment' })}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}
export default Counter;
