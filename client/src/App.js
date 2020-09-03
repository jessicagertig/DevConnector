import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <NavBar />
      <Route exact path='/' component={ Landing } />
    </Fragment>
  </Router>
)

export default App;
