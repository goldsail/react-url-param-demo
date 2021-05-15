import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Demo } from './demo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route path="/demo">
              <Demo/>
            </Route>
            <Route path="/">
              <Redirect to="/demo"/>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
