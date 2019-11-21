import ACTION_TYPES from "../actionTypes/actionTypes";

const defaultState = {
  pokemonList: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_POKEMON_LIST: {
      if (state.pokemonList.length === 0) {
        const newState = Object.assign({}, state);
        newState.pokemonList.push(...action.payload);
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;