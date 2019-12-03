import ACTION_TYPES from '../actionTypes/actionTypes';

const setPokemonList = (pokemonList) => ({
  type: ACTION_TYPES.SET_POKEMON_LIST,
  payload: pokemonList,
});
const setPokemonDetail = (pokemonDetail) => ({
  type: ACTION_TYPES.SET_POKEMON_DETAIL,
  payload: pokemonDetail,
});

export default {
  setPokemonList,
  setPokemonDetail,
};
