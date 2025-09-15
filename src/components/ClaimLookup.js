import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';

const sxStyle = {
  lookupContainer: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mx: 'auto',
    mt: 4,
    p: 3,
    border: '1px solid #ccc',
    borderRadius: 2,
    boxShadow: 3,
    backgroundColor: '#fefefe',
  },
  bntContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
};

function ClaimLookup() {
  const [id, setId] = useState('');
  const [claimData, setClaimData] = useState({});
  const [inputError, setInputError] = useState();

  useEffect(() => {}, [claimData]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!id.trim()) {
      setInputError('Please enter claim ID');

      return;
    }

    setInputError('');
    console.log('Submitted id:', id);
    // You can add further processing here, like sending the ID to a server

    try {
      const res = await axios.get(`http://localhost:3002/lookupClaim/${id}`);
      console.log('Response:', res.data);
      setClaimData(res.data);
    } catch (error) {
      setId('');
      console.error('Request failed:', error);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={sxStyle.lookupContainer}
        onSubmit={handleSubmit}
      >
        {inputError && <span>{inputError}</span>}

        {/* <input  
          type="text"
          placeholder="Enter id"
          value={id}
          onChange={e => setId(e.target.value)}
        /> */}

        <TextField
          id="outlined-basic"
          label="Claim ID"
          variant="outlined"
          onChange={e => setId(e.target.value)}
        />
        <Box sx={sxStyle.bntContainer}>
          <Tooltip
            arrow
            title={
              <div
                style={{
                  minWidth: '140px',
                  margin: '10px',
                  borderRadius: '5px',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Valid Claim IDs:
                </Typography>
                <ul
                  style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}
                >
                  <li>abc123</li>
                  <li>def456</li>
                  <li>ghi789</li>
                </ul>
              </div>
            }
          >
            <InfoIcon style={{ cursor: 'pointer' }} />
          </Tooltip>
          <Button type="submit" variant="contained" color="primary">
            Lookup Claim
          </Button>
        </Box>
      </Box>
      <div className="claim-details">
        {claimData && Object.keys(claimData).length > 0 && (
          <div>
            <h3>Claim Details:</h3>
            <p>
              <strong>ID:</strong> {claimData.id}
            </p>
            <p>
              <strong>Claimant:</strong> {claimData.claimant}
            </p>
            <p>
              <strong>Amount:</strong> {claimData.amount}
            </p>
            <p>
              <strong>Status:</strong> {claimData.status}
            </p>
            <p>
              <strong>Submitted At:</strong> {claimData.submittedAt}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
export default ClaimLookup;
