import ACTION_TYPES from '../actionTypes/actionTypes';

const { SET_POKEMON_LIST, SET_POKEMON_DETAIL } = ACTION_TYPES;

const defaultState = {
  pokemonList: [],

  // Array with all unique pokemon types
  availableTypes: [],

  // Object that will be filled with pokemon names as keys for easier data access
  pokemonByName: {},
};

/** UTILS */

const availableTypes = new Set();

const parseTypes = (typesPayload, state) => {
  const types = {};
  const newState = state;
  typesPayload.map((item) => item.type.name).forEach((type, index) => {
    types[`type${index + 1}`] = type;

    availableTypes.add(type);
    newState.availableTypes = [...availableTypes];
  });

  return types;
};

const parseStats = (statsPayload) => {
  const stats = {};
  statsPayload.forEach((item) => {
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

const removeDuplicates = (list, id) => {
  if (list.length === 0) return list;
  return list.filter((item, index, self) => self.findIndex((i) => i[id] === item[id]) === index);
};

const retrieveIdFromUrl = (url) => {
  const parsedId = parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', ''), 10);
  return parsedId;
};

/** REDUCER FUNCTION */
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POKEMON_LIST: {
      const { payload: newPokemons } = action;

      newPokemons.forEach((pokemon) => {
        const currentPokemon = pokemon;
        currentPokemon.id = currentPokemon.id || retrieveIdFromUrl(pokemon.url);
      });
      const newPokemonList = [...state.pokemonList, ...newPokemons];
      const parsedNewPokemonList = removeDuplicates(newPokemonList, 'name');

      const newState = {
        ...state,
        pokemonList: parsedNewPokemonList,
      };
      return newState;
    }

    case SET_POKEMON_DETAIL: {
      const { name: payloadName, types, stats } = action.payload;

      let currentPokemonDetails;

      const updatedPokemonList = state.pokemonList.map((pokemon) => {
        if (pokemon.name === payloadName) {
          currentPokemonDetails = {
            ...pokemon,
            ...parseTypes(types, state),
            ...parseStats(stats),
          };
          return currentPokemonDetails;
        }
        return pokemon;
      });

      const newState = {
        ...state,
        pokemonByName: { ...state.pokemonByName, [payloadName]: currentPokemonDetails },
        pokemonList: updatedPokemonList,
      };

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
