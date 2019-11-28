import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import styles from './Selection.module.css';

import PokemonDetail from './elements/PokemonDetail';
import SelectionFilter from './SelectionFilter';

import useHttpRequest from '../../hooks/useHttpRequest';
import useDebounceInput from '../../hooks/useDebounceInput';

import ACTIONS from '../../containers/App/actions/actions';

const selectionPropTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const Selection = ({
  limit, offset, title,
}) => {
  const pokemons = useSelector((state) => state.pokemonList);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const urlSelection = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  const { response, error, isLoading } = useHttpRequest(urlSelection);

  const [listToDisplay, setListToDisplay] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const debouncedCurrentSearch = useDebounceInput(currentSearch, 300);

  // Adding received data from backend to Redux store
  useEffect(
    () => {
      if (response) {
        dispatch(ACTIONS.setPokemonList(response.results));
      }
    }, [dispatch, response],
  );

  // Filtering the response data according to the last debounced input
  useEffect(
    () => {
      if (pokemons) {
        setListToDisplay(debouncedCurrentSearch
          ? pokemons.filter(
            (p) => p.name.toUpperCase().indexOf(debouncedCurrentSearch.toUpperCase().trim()) !== -1,
          )
          : pokemons);
      }
    }, [debouncedCurrentSearch, pokemons],
  );

  /* Event handler for updating search term */
  const updateSearchTermHandler = useCallback((e) => {
    setCurrentSearch(e.target.value);
  }, []);

  return (
    <>
      <h1 className={styles.title}>{title.toUpperCase()}</h1>

      {isLoading && <div>Loading data...</div>}

      {error && <div>Error retrieving the list of Pokemons to select.</div>}

      {/* FILTER SECTION */}

      {response && (
        <SelectionFilter
          currentSearch={currentSearch}
          updateSearchTermHandler={updateSearchTermHandler}
        />
      )}

      <div className={styles['pokemons-container']}>
        {
        listToDisplay.map((pokemon) => (
          <PokemonDetail
            key={pokemon.name}
            pokemonName={pokemon.name}
          />
        ))
			}
      </div>
    </>
  );
};

Selection.propTypes = selectionPropTypes;

export default connect()(Selection);
