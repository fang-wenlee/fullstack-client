import React from 'react';

import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

const ReactProjectsList = () => {
  // Sample data, replace with your actual projects
  // const projects = [
  //   { id: 1, name: 'Project Alpha', description: 'First React project.' },
  //   { id: 2, name: 'Project Beta', description: 'Second React project.' },
  //   { id: 3, name: 'Project Gamma', description: 'Third React project.' },
  // ];

  const style = {
    projectContainer: {
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
    ul: {
      listStyleType: 'none',

      '& a': {
        color: '#043668ff',
        fontSize: '1.2rem',
        textDecoration: 'none',
      },
    },
  };

  return (
    <Box sx={style.projectContainer}>
      <Typography variant="h4" gutterBottom>
        React Projects List
      </Typography>

      <Box component="ul" sx={style.ul}>
        <li>
          <Link to="/lookup">Claim Lookup with API Call</Link>
        </li>
        <li>
          <Link to="/claimform">Claim Form with server-side validation</Link>
        </li>
        <li>
          <Link to="/usememo1">useMemo [ Mock data via props ]</Link>
        </li>
        <li>
          <Link to="/usememo2">
            useMemo [ Fetches User data and Stores it in State and Filters the
            list using useMemo ]
          </Link>
        </li>
        <li>
          <Link to="/classComp"> Error showing: display Not Found Page</Link>
        </li>
      </Box>
    </Box>
  );
};

export default ReactProjectsList;
