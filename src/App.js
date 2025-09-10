 import ClaimForm from './components/ClaimForm';
import ClaimLookup from './components/ClaimLookup';
import Counter from './components/Counter';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import './index.css'
import './App.css'
function App() {
  const [fname, setFname] = useState('');



  return (
    <div className="app">



          <Router>
              <nav>
                <ul className="horizontal-menu">
                  <li><Link to="/">Claim Form</Link></li>
                  <li><Link to="/lookup">Claim Lookup</Link></li>
                   <li><Link to="/counter">Counter </Link></li>
                </ul>
              </nav>

          {fname && <h2>Welcome , {fname}</h2>}
            <Routes>
                <Route path='/' element={<ClaimForm/>} />
                <Route path='/Lookup' element={<ClaimLookup/>} />
                <Route path='/counter' element={<Counter setFname={setFname} />} />
                <Route path='*' element={<h2>Page Not Found</h2>} />
            </Routes>
          </Router>


        
   </div>
  );
}

export default App;
