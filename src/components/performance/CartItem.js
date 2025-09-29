import React from 'react';
import PropTypes from 'prop-types';

function CartItem({ item, onQuantityChange }) {
  console.log(`Rendering: ${item.name}`);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <strong>{item.name}</strong> - ${Number(item.price || 0).toFixed(2)} = $
      {(item.price * item.quantity).toFixed(2)}
      <br />
      Quantity:
      <select
        value={item.quantity}
        onChange={e => onQuantityChange(item.id, Number(e.target.value))}
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
// PropTypes
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};
const MemoizedCartItem = React.memo(CartItem);
// ensure devTools show CartItem instead of memo
// without displayName, it is hard to tell which component it is, especailly if
// you have multiple memoized component
MemoizedCartItem.displayName = 'CartItem';

export default MemoizedCartItem;
