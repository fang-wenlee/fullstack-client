import React, { useState } from 'react';
import ClaimForm from './components/ClaimForm';
import ClaimLookup from './components/ClaimLookup';
import Welcome from './components/Welcome';
import GitHubProfile from './components/GitHubProfile';
import ReactProjectsList from './components/ReactProjectsList';

import Appbar from './components/Appbar';

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//=================================================================
import UserSearch from './components/UserSearch';
import UserSearchApi from './components/UserSearchApi';
import TotalCalculator from './components/TotalCalculator';
import Cart from './components/performance/Cart';

//================================================
import DebounceSearch from './components/useRef/DebounceSearch';
import UncontrolledForm from './components/useRef/UncontrolledForm';
//=============================================================

import UseReducerForm from './components/useReducer/UseReducerForm';
import SimpleCounter from './components/useReducer/SimpleCounter';

import './index.css';
import './App.css';

const sampleUsers = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
];
const style = {
  routerContainer: {
    maxWidth: '56%',
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
  },
};

function App() {
  const [fname, setFname] = useState('');

  return (
    <Box>
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
        <Box sx={style.routerContainer}>
          {fname && <h2>Welcome , {fname}</h2>}
        </Box>
        <Routes>
          <Route path="/claimform" element={<ClaimForm />} />
          <Route path="/Lookup" element={<ClaimLookup />} />
          <Route path="/welcome" element={<Welcome setFname={setFname} />} />
          <Route path="/profile" element={<GitHubProfile />} />
          <Route path="/projects" element={<ReactProjectsList />} />
          <Route
            path="/usememo1"
            element={<UserSearch users={sampleUsers} />}
          />
          <Route path="/usememo2" element={<UserSearchApi />} />
          <Route path="/usememo3" element={<TotalCalculator />} />
          <Route path="/useCallback-memo" element={<Cart />} />
          <Route
            path="/controledForm-useRef-Debouncing"
            element={<DebounceSearch />}
          />

          <Route
            path="/useRef-UncontrolledForm"
            element={<UncontrolledForm />}
          />

          <Route path="/useReducer-complexState" element={<UseReducerForm />} />
          <Route path="/useReducer-counter" element={<SimpleCounter />} />
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
    </Box>
  );
}
export default App;
