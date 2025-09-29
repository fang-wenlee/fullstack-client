// App.js
import React, { useState, useCallback } from 'react';
import CartItem from './CartItem';

// Mock data
const mockItems = [
  { id: 1, name: 'T-shirt', price: 19.99, quantity: 2 },
  { id: 2, name: 'Jeans', price: 49.99, quantity: 1 },
  { id: 3, name: 'Sneakers', price: 89.99, quantity: 1 },
];

function Cart() {
  const [items, setItems] = useState(mockItems);

  // Memoized callback to prevent function recreation,
  const handleQuantityChange = useCallback((id, newQty) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      <hr />
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
