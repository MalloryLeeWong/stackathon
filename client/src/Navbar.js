import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';

const Navbar = (props) => {
  return (
    <Router>
      <div className="App">
        <h1>Earthquake Relief Trace</h1>
        <h2>Make a donation for earthquake relief that you can trace.</h2>
      <div className="nav space-between">
        <Link to="/">Home</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/oracle">Update Seismic Data</Link>
        <Link to="/withdraw">Receive Donation</Link>
      </div >
      </div>
    </Router>
  );
};

export default Navbar;
