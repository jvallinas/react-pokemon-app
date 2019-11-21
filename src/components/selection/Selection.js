import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Selection.module.css';

import PokemonDetail from './elements/PokemonDetail';

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
	imagePath: PropTypes.string,
	pokemons: PropTypes.array,
	setPokemonList: PropTypes.func
}

function Selection(props) {
	const urlSelection = `https://pokeapi.co/api/v2/pokemon/?limit=${props.limit}&offset=${props.offset}`;
	const { response, error, isLoading } = useHttpRequest(urlSelection);

	const [listToDisplay, setListToDisplay] = useState([]);
	const [currentSearch, setCurrentSearch] = useState('');
	const debouncedCurrentSearch = useDebounceInput(currentSearch, 300);

	// Filtering the response data according to the last debounced input
	useEffect(
		() => {
			if (response) {
			props.setPokemonList(response.results);
			}
		}, [response, props]
	);

	// Filtering the response data according to the last debounced input
	useEffect(
		() => {
			if (props.pokemons) {
				setListToDisplay(debouncedCurrentSearch
					? props.pokemons.filter(pokemon => pokemon.name.toUpperCase().indexOf(debouncedCurrentSearch.toUpperCase().trim()) !== -1)
					: props.pokemons
				);
			}
		}, [debouncedCurrentSearch, props.pokemons]
	);

	return (
		<>
			<h1 className={styles['title']}>{props.title.toUpperCase()}</h1>

			{isLoading && <div>Loading data...</div>}

			{error && <div>Error retrieving the list of Pokemons to select.</div>}

			{/* FILTER SECTION */}
			{response &&
				<div className={styles['filter-container']}>
					<div className={styles.search}>SEARCH</div>
					<input type="text" className={styles.filter} 
						placeholder="Name" 
						value={currentSearch} 
						onChange={(e) => setCurrentSearch(e.target.value)}></input>
				</div>
			}

			{listToDisplay.map((pokemon) => (
					<PokemonDetail key={pokemon.name} pokemonName={pokemon.name}/>
				))
			}
		</>
	);
}

Selection.propTypes = selectionPropTypes;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selection);