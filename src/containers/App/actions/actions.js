import ACTION_TYPES from '../actionTypes/actionTypes';

const setPokemonList = (pokemonList) => ({
  type: ACTION_TYPES.SET_POKEMON_LIST,
  payload: pokemonList,
});
const setPokemonDetail = (pokemonDetail) => ({
  type: ACTION_TYPES.SET_POKEMON_DETAIL,
  payload: pokemonDetail,
});

const setPokemonDescription = (pokemonDescription) => ({
  type: ACTION_TYPES.SET_POKEMON_DESCRIPTION,
  payload: pokemonDescription,
});

const setPokemonTypes = (pokemonTypes) => ({
  type: ACTION_TYPES.SET_POKEMON_TYPES,
  payload: pokemonTypes,
});

const setPokemonForBattle = (pokemonName) => ({
  type: ACTION_TYPES.SET_POKEMON_FOR_BATTLE,
  payload: pokemonName,
});

export default {
  setPokemonList,
  setPokemonDetail,
  setPokemonDescription,
  setPokemonTypes,
  setPokemonForBattle,
};
