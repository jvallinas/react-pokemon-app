import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import ROUTES from './routes';
import Overview from './components/overview/Overview';
import Selection from './components/selection/Selection';

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './containers/App/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.APP.ROOT}>
              <Overview title={'Pokemon Battle'} subtitle={'Test your skills by building a Pokemon application'}/>
            </Route>
            <Route path={ROUTES.APP.SELECTION.INDEX}>
              <Selection title={'Select your Pokemon'} limit={25} offset={0} />                    
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  );
}

export default App;
