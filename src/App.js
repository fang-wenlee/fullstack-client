import React, { useState } from 'react';
import ClaimForm from './components/ClaimForm';
import ClaimLookup from './components/ClaimLookup';
import Counter from './components/Counter';
import GitHubProfile from './components/GitHubProfile';
import ReactProjectsList from './components/ReactProjectsList';

import Appbar from './components/Appbar';

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSearch from './components/UserSearch';
import UserSearchApi from './components/UserSearchApi';
import './index.css';
import './App.css';

const sampleUsers = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
];

function App() {
  const [fname, setFname] = useState('');

  return (
    <div className="app">
      <Router>
        {/* Appbar will replace the nav below */}
        <Appbar />
        {/* <nav>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">Claim Form</Link>
            </li>
            <li>
              <Link to="/lookup">Claim Lookup</Link>
            </li>
            <li>
              <Link to="/counter">Counter </Link>
            </li>
            <li>
              <Link to="/profile">GitHub Profile </Link>
            </li>
          </ul>
        </nav> */}

        {fname && <h2>Welcome , {fname}</h2>}
        <Routes>
          <Route path="/claimform" element={<ClaimForm />} />
          <Route path="/Lookup" element={<ClaimLookup />} />
          <Route path="/counter" element={<Counter setFname={setFname} />} />

          <Route path="/profile" element={<GitHubProfile />} />
          <Route path="/projects" element={<ReactProjectsList />} />

          <Route
            path="/usememo1"
            element={<UserSearch users={sampleUsers} />}
          />
          <Route path="/usememo2" element={<UserSearchApi />} />
          <Route
            path="*"
            element={
              <Box
                component="div"
                sx={{ maxWidth: '500px', textAlign: 'center', mt: 5 }}
              >
                {' '}
                <h2>Page Not Found</h2>{' '}
              </Box>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
