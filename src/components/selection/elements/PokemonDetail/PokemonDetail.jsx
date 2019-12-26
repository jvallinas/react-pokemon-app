import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import styles from './PokemonDetail.module.css';

import useHttpRequest from '../../../../hooks/useHttpRequest';
import BaseButton from '../../../_common/BaseButton/BaseButton';

import ACTIONS from '../../../../containers/App/actions/actions';

const pokemonDetailPropTypes = {
  pokemonName: PropTypes.string.isRequired,
};

const PokemonDetail = ({
  pokemonName,
}) => {
  const dispatch = useDispatch();

  const pokemonDetail = useSelector(
    (state) => state.pokemonList.filter((pokemon) => pokemon.name === pokemonName)[0],
  );

  const urlPokemonDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const { response: pokemonData } = useHttpRequest(urlPokemonDetail);

  const urlPokemonDescription = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
  const { response: pokemonDescription } = useHttpRequest(urlPokemonDescription);

  const history = useHistory();
  const goToPokemonDetail = useCallback(() => history.push(`/selection/${pokemonName}`), [history, pokemonName]);
  const selectButtonStyles = useMemo(() => ['uppercase'], []);

  // Adding received data from backend to Redux store
  useEffect(
    () => {
      if (pokemonData) {
        dispatch(ACTIONS.setPokemonDetail(pokemonData));
      }
    }, [dispatch, pokemonData],
  );

  // Adding received data from backend to Redux store
  useEffect(
    () => {
      if (pokemonDescription) {
        dispatch(ACTIONS.setPokemonDescription(pokemonDescription));
      }
    }, [dispatch, pokemonDescription],
  );

  return (
    <>
      <div className={styles['pokemon-container']}>
        <img
          className={styles['pokemon-image-container']}
          src={pokemonDetail && pokemonDetail.image}
          alt=""
        />

        <h1 className={styles['pokemon-title']}>{pokemonName}</h1>

        {pokemonDetail && (
          <>
            <h1 className={styles['pokemon-id']}>{pokemonDetail.id}</h1>
            <BaseButton label="Select" onClickHandler={goToPokemonDetail} styleOptions={selectButtonStyles} />
          </>
        )}

      </div>
    </>
  );
};

PokemonDetail.propTypes = pokemonDetailPropTypes;

export default React.memo(PokemonDetail);
