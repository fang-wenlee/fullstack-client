import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const style = {
    profileContainer: {
      maxWidth: 450,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      mx: 'auto', // margin left & margin right auto to center
      mt: 4, // margin top for 32px
      p: 3,
      border: '1px solid #ccc',
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: '#fefefe',
    },
    btnContainer: {
      dispaly: 'flex',
      alignItems: 'center',
      gap: 1,
      mt: 2,
      '& button': { ml: 1 },
      '& svg': { verticalAlign: 'middle' },
    },
    error: { color: 'red', fontSize: '0.875rem', mb: 1 },
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:3002/github/user/${username}`
      );
      setProfile(res.data);

      setError('');
      setUsername('');
    } catch (err) {
      setError('User not found or server error');
      setProfile(null);
    }
  };

  return (
    <>
      <Box component="form" sx={style.profileContainer} onSubmit={handleSubmit}>
        {error && (
          <Box component="span" sx={style.error}>
            {error}
          </Box>
        )}
        {/* <input
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /> */}
        <TextField
          label="User Name"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <Box sx={style.btnContainer}>
          <Tooltip
            title="Enter user name and Click to fetch GitHub profile"
            arrow
            placement="top"
          >
            {' '}
            <InfoIcon />
          </Tooltip>
          <Button type="submit" variant="contained" color="primary">
            Fetch Profile
          </Button>
        </Box>

        {profile && (
          <div>
            <h2>{profile.name || profile.login}</h2>
            <img src={profile.avatar_url} alt="avatar" width={350} />
            <p>{profile.bio}</p>
          </div>
        )}
      </Box>
    </>
  );
};

export default GitHubProfile;
