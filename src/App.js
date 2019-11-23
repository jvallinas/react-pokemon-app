import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./containers/App/store";

import './App.css';

import { Overview, Selection } from "./views";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
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
    </ReduxProvider>
  );
}

export default App;
