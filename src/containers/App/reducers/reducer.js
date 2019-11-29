import ACTION_TYPES from '../actionTypes/actionTypes';

const defaultState = {
  pokemonList: [],
};

const { SET_POKEMON_LIST, SET_POKEMON_DETAIL } = ACTION_TYPES;

const parseTypes = (typesPayload) => {
  const types = {};
  typesPayload.map((item) => item.type.name).forEach((type, index) => {
    types[`type${index + 1}`] = type;
  });
  return types;
};

const parseStats = (statsPayload) => {
  const stats = {};
  statsPayload.forEach((item, index) => {
    switch (item.stat.name) {
      case 'attack':
      case 'defense':
      case 'speed':
      case 'special-attack':
      case 'special-defense':
        stats[item.stat.name] = item.base_stat;
        break;
      default:
        break;
    }
  });
  return stats;
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POKEMON_LIST: {
      const listIsNotInitialized = Boolean(state.pokemonList.length === 0);

      if (listIsNotInitialized) {
        const { payload: pokemons } = action;
        const newState = {
          ...state,
          pokemonList: [...pokemons],
        };
        return newState;
      }
      return state;
    }

    case SET_POKEMON_DETAIL: {
      const { name, types, stats } = action.payload;

      const updatedPokemonList = state.pokemonList.map((pokemon) => {
        if (pokemon.name === name) {
          return { ...pokemon, ...parseTypes(types), ...parseStats(stats) };
        }
        return pokemon;
      });

      const newState = {
        ...state,
        pokemonByName: { [name]: updatedPokemonList },
        pokemonList: updatedPokemonList,
      };

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
