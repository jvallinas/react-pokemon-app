import ACTION_TYPES from "../actionTypes/actionTypes";

const defaultState = {
  pokemonList: []
};

const { SET_POKEMON_LIST } = ACTION_TYPES;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POKEMON_LIST: {
      const listIsNotInitialized = Boolean(state.pokemonList.length === 0);

      if (listIsNotInitialized) {
        const {payload: pokemons} = action;
        const newState = {...state};
        newState.pokemonList = [...pokemons];
        return newState;
      }
      return state;
    }

    default:
      return state;
  }
};

export default reducer;