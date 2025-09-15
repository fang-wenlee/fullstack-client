import React, { useState } from 'react';
import axios from 'axios';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/github/user/${username}`
      );
      setProfile(res.data);
      setError('');
    } catch (err) {
      setError('User not found or server error');
      setProfile(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Fetch Profile</button>

      {error && <p>{error}</p>}
      {profile && (
        <div>
          <h2>{profile.name || profile.login}</h2>
          <img src={profile.avatar_url} alt="avatar" width={100} />
          <p>{profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
