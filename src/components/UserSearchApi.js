import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

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
    // boxShadow: 3,
    backgroundColor: '#fefefe',
  },
};

const UserSearchApi = () => {
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // useEffect(()=>{
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((res =>  res.json() )
  //     .then( (data) => setUserData(data))
  //     .catch(err=> console.error('Fetch error:', err ))
  // }, []);

  /*
   why use axios:
   • No need to manually parse JSON ( is already parsed).
   • Built-in support for request/response interceptors.
   • Easier to handle headers, and error states.
  */
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUserData(response.data))
      .catch(error => console.error('Axios error:', error));
  }, []);

  const filteredUsers = useMemo(() => {
    const lowerSearch = searchInput.toLowerCase();

    return userData.filter(user =>
      user.name.toLowerCase().includes(lowerSearch)
    );
  }, [userData, searchInput]);

  return (
    <Box sx={style.memoContainer}>
      <h2> User Directory</h2>
      <input
        type="text"
        placeholder="Enter user name"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default UserSearchApi;
