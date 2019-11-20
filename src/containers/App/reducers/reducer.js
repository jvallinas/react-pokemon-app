import ACTION_TYPES from "../actionTypes/actionTypes";

const defaultState = {
  pokemonList: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_POKEMON_LIST: {
      state.pokemonList.push([...action.payload]);
      const newState = Object.assign({}, state);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;