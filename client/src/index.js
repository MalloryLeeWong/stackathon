import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import App from './Homepage';
// import Homepage from './Homepage'
import Routes from './Routes'
// import history from './History'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router><Routes /></Router>, document.getElementById('root')
);

serviceWorker.unregister();
