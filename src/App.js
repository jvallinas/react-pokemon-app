import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Overview from './components/overview/Overview';
import Selection from './components/selection/Selection';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Overview title={'Pokemon Battle'} subtitle={'Test your skills building a Pokemon application'}/>
          </Route>
          <Route path="/selection">
            <Selection title={'Select your Pokemon'} limit={50} offset={20} />                    
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
