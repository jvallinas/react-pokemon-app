// Core
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import ACTIONS from '../../containers/App/actions/actions';
import CONSTANTS from '../../config.values';

// UI
import BaseButton from '../_elements/BaseButton';
import PokemonDetail from './elements/PokemonDetail';
import SelectionFilter from './SelectionFilter';
import styles from './Selection.module.css';

// Custom hooks
import useHttpRequest from '../../hooks/useHttpRequest';
import useDebounceInput from '../../hooks/useDebounceInput';

const selectionPropTypes = {
  currentPage: PropTypes.number,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  previousPageHandler: PropTypes.func.isRequired,
  nextPageHandler: PropTypes.func.isRequired,
};

const selectionDefaultProps = {
  currentPage: 0,
};

const {
  SELECTION: { PAGINATION: { ITEMS_PER_PAGE } },
} = CONSTANTS;

const Selection = ({
  limit, offset, title, currentPage,
  previousPageHandler, nextPageHandler,
}) => {
  const pokemons = useSelector((state) => state.pokemonList);
  const availableTypes = useSelector((state) => state.availableTypes);
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  
  useEffect(() => {
    document.title = title;
  }, [title]);

  const urlSelection = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  const {
    response, error, isLoading, activateRequest,
  } = useHttpRequest(urlSelection);

  const [listToDisplay, setListToDisplay] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const debouncedCurrentSearch = useDebounceInput(currentSearch, 500);

  // Adding received data from backend to Redux store
  useEffect(
    () => {
      if (response) {
        dispatch(ACTIONS.setPokemonList(response.results));
      }
    }, [dispatch, response],
  );

  // Setting pokemons to display in page
  useEffect(
    () => {
      if (pokemons.length > 0) {
        setListToDisplay(pokemons.filter((p) => p.id > offset && p.id <= offset + ITEMS_PER_PAGE));
      }
    }, [pokemons],
  );

  // Filtering the data according to the last debounced input
  useEffect(
    () => {
      setListToDisplay(() => pokemons.filter((p) => p.id > offset && p.id <= offset + ITEMS_PER_PAGE));

      if (debouncedCurrentSearch) {
        setListToDisplay(() => pokemons.filter((p) => p.name.toUpperCase().indexOf(debouncedCurrentSearch.toUpperCase().trim()) !== -1));
      } else if (selectedType && selectedType !== 'none') {
        setListToDisplay(listToDisplay => [...listToDisplay.filter((p) => p.type1 === selectedType ||  p.type2 === selectedType)]);
      } else if (!selectedType || selectedType === 'none') {
        setListToDisplay(() => pokemons.filter((p) => p.id > offset && p.id <= offset + ITEMS_PER_PAGE));
      } 
    }, [debouncedCurrentSearch, selectedType, offset],
  );

  // Triggers another http call on offset change to retrieve data for new page
  useEffect(
    () => {
      activateRequest();
    }, [offset, activateRequest],
  );

  /* EVENT HANDLERS */
  const updateSearchTermHandler = useCallback((e) => {
    setCurrentSearch(e.target.value);
  }, []);

  const updateSelectedTypeHandler = useCallback((e) => {
    setSelectedType(e.target.value);
  }, []);

  return (
    <>
      <h1 className={styles.title}>{title.toUpperCase()}</h1>
      {/* FILTER & PAGINATION SECTION */}
      {response && (
        <>
          <SelectionFilter
            currentSearch={currentSearch}
            updateSearchTermHandler={updateSearchTermHandler}
            availableTypes={availableTypes}
            updateSelectedTypeHandler={updateSelectedTypeHandler}
            selectedType={selectedType}
          />
          <div className={styles['pagination-container']}>
            <BaseButton label="< Previous" onClickHandler={previousPageHandler} styleOptions={['purple', 'transparent']} />
            <span className={styles['page-label']}>
              {`Page ${currentPage}`}
            </span>
            <BaseButton label="Next >" onClickHandler={nextPageHandler} styleOptions={['purple', 'transparent']} />
          </div>
        </>
      )}

      {isLoading && <div className={styles.placeholder}>Loading data...</div>}

      {error && (
        <div className={styles.placeholder}>Error retrieving the list of Pokemons to select.</div>
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

Selection.defaultProps = selectionDefaultProps;
Selection.propTypes = selectionPropTypes;

export default connect()(Selection);
