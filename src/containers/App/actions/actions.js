import ACTION_TYPES from '../actionTypes/actionTypes';

const setPokemonList = (pokemonList) => ({
  type: ACTION_TYPES.SET_POKEMON_LIST,
  payload: pokemonList,
});

export default {
  setPokemonList,
};
