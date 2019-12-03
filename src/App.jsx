import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import { Provider as ReduxProvider } from 'react-redux';
import { Overview, Selection } from './views';
import ROUTES from './routes';
import CONSTANTS from './config.values';

import configureStore from './containers/App/store';

import usePaginationHandler from './hooks/usePaginationHandler';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const {
  SELECTION: {
    PAGINATION: { ITEMS_PER_PAGE, INITIAL_OFFSET },
  },
} = CONSTANTS;

const App = () => {
  const {
    itemsPerPage, currentPage,
    goToPreviousPage, goToNextPage,
  } = usePaginationHandler(ITEMS_PER_PAGE, INITIAL_OFFSET);

  return (
    <ReduxProvider store={reduxStore}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.APP.ROOT}>
              <Overview title="Pokemon Battle" subtitle="Test your skills by building a Pokemon application" />
            </Route>
            <Route path={ROUTES.APP.SELECTION.INDEX}>
              <Selection
                title="Select your Pokemon"
                limit={itemsPerPage}
                currentPage={currentPage}
                offset={itemsPerPage * currentPage}
                previousPageHandler={goToPreviousPage}
                nextPageHandler={goToNextPage}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  );
};

export default App;
