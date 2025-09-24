import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

const style = {
  memoContainer: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mx: 'auto', // margin left & margin right auto to center
    mt: 3, // margin top for 24px
    p: 3,
    border: '1px solid #ccc',
    borderRadius: 2,
    backgroundColor: '#fefefe',
  },
};

const UserSearch = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const { users } = props;

  // Memoize the filtered list to avoid recalculating on every render
  const filteredUsers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(lowerSearch));
  }, [users, searchTerm]);

  return (
    <Box sx={style.memoContainer}>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Box>
  );
};

// UserSearch.propTypes = {
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

const userType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
});

UserSearch.propTypes = {
  users: PropTypes.arrayOf(userType).isRequired,
};

export default UserSearch;
