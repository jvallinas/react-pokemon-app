import ACTION_TYPES from '../actionTypes/actionTypes';

const {
  SET_POKEMON_LIST,
  SET_POKEMON_DETAIL,
  SET_POKEMON_DESCRIPTION,
  SET_POKEMON_TYPES,
  SET_POKEMON_FOR_BATTLE,
} = ACTION_TYPES;

const defaultState = {
  // Array of objects with each pokemon data
  pokemonList: [],

  // Array with all unique pokemon types
  availableTypes: [],

  pokemonSlot1: undefined,
  pokemonSlot2: undefined,
};

/** UTILS */

const parseTypes = (typesPayload) => {
  const types = {};
  typesPayload.map((item) => item.type.name).forEach((type, index) => {
    types[`type${index + 1}`] = type;
  });

  return types;
};

const parseAbilities = (abilities) => abilities.map((abilityInfo) => abilityInfo.ability.name);

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

const parseImages = (sprites) => ({ image: sprites.front_default });

const parseDescription = (payload) => {
  const englishDesc = payload.flavor_text_entries.filter((entry) => entry.language.name === 'en')[0];
  return {
    description: englishDesc.flavor_text,
  };
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

    case SET_POKEMON_TYPES: {
      const types = action.payload.map((type) => type.name);
      return {
        ...state,
        availableTypes: [...types],
      };
    }

    case SET_POKEMON_DETAIL: {
      const {
        name: payloadName,
        types,
        stats,
        abilities,
        sprites,
        weight,
        height,
      } = action.payload;

      let currentPokemonDetails;

      const updatedPokemonList = state.pokemonList.map((pokemon) => {
        if (pokemon.name === payloadName) {
          currentPokemonDetails = {
            ...pokemon,
            abilities: [...parseAbilities(abilities)],
            ...parseTypes(types, state),
            ...parseStats(stats),
            ...parseImages(sprites),
            weight,
            height,
          };
          return currentPokemonDetails;
        }
        return pokemon;
      });

      const newState = {
        ...state,
        pokemonList: updatedPokemonList,
      };

      return newState;
    }

    case SET_POKEMON_DESCRIPTION: {
      let currentPokemonDetails;

      const updatedPokemonList = state.pokemonList.map((pokemon) => {
        if (pokemon.name === action.payload.name) {
          currentPokemonDetails = {
            ...pokemon,
            ...parseDescription(action.payload),
          };
          return currentPokemonDetails;
        }
        return pokemon;
      });

      return {
        ...state,
        pokemonList: updatedPokemonList,
      };
    }

    case SET_POKEMON_FOR_BATTLE: {
      return {
        ...state,
        pokemonSlot1: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
