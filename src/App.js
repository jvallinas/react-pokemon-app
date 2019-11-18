import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Overview from './components/overview/Overview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Overview title={'Pokemon Battle'} subtitle={'Test your skills building a Pokemon application'}/>
          </Route>
          <Route path="/selection">
            <div>This route will be used for Pokemon selection.</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
