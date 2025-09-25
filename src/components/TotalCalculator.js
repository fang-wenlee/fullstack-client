import React, { useState, useMemo } from 'react';

import { Box, Button, Typography } from '@mui/material';

const style = {
  shoppingContainer: {
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

const mockItems = [
  { id: 1, name: 'T-shirt', price: 19.99, quantity: 2 },
  { id: 2, name: 'Jeans', price: 49.99, quantity: 1 },
  { id: 3, name: 'Sneakers', price: 89.99, quantity: 1 },
];

function TotalCalculator() {
  const [count, setCount] = useState(0); // unrelated state
  const [items, setItems] = useState(mockItems);

  // Modify quantity of first item
  const updateQuantity = () => {
    const updated = items.map(item =>
      item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updated);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, quantity: Number(newQuantity) } : item
    );
    setItems(updated);
  };

  const total = useMemo(() => {
    console.log('🧠 useMemo: Calculating total...');
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]); // total only recalculates if mockItems change

  return (
    <Box sx={style.shoppingContainer}>
      <Typography variant="h4">Shopping Cart: Total Calculator</Typography>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} – ${item.price.toFixed(2)} ×{' '}
            <select
              value={item.quantity}
              onChange={e => handleQuantityChange(item.id, e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>{' '}
            = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
      <Button variant="contained" onClick={() => setCount(prev => prev + 1)}>
        Re-render (count: {count})
      </Button>
      <Button variant="contained" onClick={updateQuantity}>
        Add One More T-shirt
      </Button>
    </Box>
  );
}

export default TotalCalculator;
