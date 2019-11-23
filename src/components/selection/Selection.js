import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Selection.module.css';

import PokemonDetail from './elements/PokemonDetail';
import InputText from '../_elements/InputText';

import useHttpRequest from '../../hooks/useHttpRequest';
import useDebounceInput from '../../hooks/useDebounceInput';

import ACTIONS from '../../containers/App/actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	pokemons: state.pokemonList
});

const mapDispatchToProps = dispatch => ({
	setPokemonList: items => dispatch(ACTIONS.setPokemonList(items)),
});
  
const selectionPropTypes = {
	limit: PropTypes.number,
	offset: PropTypes.number,
	title: PropTypes.string,
	pokemons: PropTypes.array,
	setPokemonList: PropTypes.func
}

const Selection = ({ limit, offset, pokemons, setPokemonList, title }) => {
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
			setPokemonList(response.results);
			}
		}, [response, setPokemonList]
	);

	// Filtering the response data according to the last debounced input
	useEffect(
		() => {
			if (pokemons) {
				setListToDisplay(debouncedCurrentSearch
					? pokemons.filter(pokemon => pokemon.name.toUpperCase().indexOf(debouncedCurrentSearch.toUpperCase().trim()) !== -1)
					: pokemons
				);
			}
		}, [debouncedCurrentSearch, pokemons]
	);

	/* Event handler for updating search term */
	const updateSearchTermHandler = useCallback((e) => {
		setCurrentSearch(e.target.value)
	}, []);

	return (
		<>
			<h1 className={styles['title']}>{title.toUpperCase()}</h1>

			{isLoading && <div>Loading data...</div>}

			{error && <div>Error retrieving the list of Pokemons to select.</div>}

			{/* FILTER SECTION */}
			{response &&
				<div className={styles['filter-container']}>
					<div className={styles.search}>SEARCH</div>
					<InputText 
						className='selection-filter'
						placeholder='Search by name...'
						currentValue={currentSearch}
						onChangeHandler={updateSearchTermHandler} 
					/>
				</div>
			}

			<div className={styles['pokemons-container']}>
			{
				listToDisplay.map((pokemon) => (
					<PokemonDetail key={pokemon.name} pokemonName={pokemon.name}/>
				))
			}
			</div>
		</>
	);
}

Selection.propTypes = selectionPropTypes;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selection);