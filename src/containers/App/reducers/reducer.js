import ACTION_TYPES from '../actionTypes/actionTypes';
import {
  parseAbilities,
  parseDescription,
  parseImages,
  parseStats,
  parseTypes,
  removeDuplicates,
  retrieveIdFromUrl,
} from './utils/utils';

const {
  SET_POKEMON_LIST,
  SET_POKEMON_DETAIL,
  SET_POKEMON_DESCRIPTION,
  SET_POKEMON_TYPES,
  SET_POKEMON_FOR_BATTLE,
  REMOVE_POKEMON_FROM_BATTLE,
} = ACTION_TYPES;

const defaultState = {
  // Array of objects with each pokemon data
  pokemonList: [],
  pokemonBattleground: [],

  // Array with all unique pokemon types
  availableTypes: [],
  weaknessesForType: [],
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
      const weaknessInfo = action.payload.map((type) => (
        {
          name: type.name,
          weakTo: type.damage_relations.double_damage_from.map((weakness) => weakness.name),
        }
      ));
      return {
        ...state,
        availableTypes: [...types],
        weaknessesForType: [...weaknessInfo],
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
      const newPokemon = state.pokemonList.filter((p) => p.name === action.payload)[0];
      const pokemonsInBattleground = state.pokemonBattleground.length;
      switch (pokemonsInBattleground) {
        case 0:
          return {
            ...state,
            pokemonBattleground: [newPokemon],
          };
        case 1:
          return {
            ...state,
            pokemonBattleground: [...state.pokemonBattleground, newPokemon],
          };
        default:
          // TODO refine behavior when both battle slots are already taken
          // Right now first slot will be overwritten with new pokemon,
          // and second slot will be empty
          return {
            ...state,
            pokemonBattleground: [newPokemon],
          };
      }
    }

    case REMOVE_POKEMON_FROM_BATTLE: {
      const newBattleground = state.pokemonBattleground.filter((p) => p.name === !action.payload);
      return {
        ...state,
        pokemonBattleground: [...newBattleground],
      };
    }

    default:
      return state;
  }
};

export default reducer;
