import React from 'react';
import PropTypes from 'prop-types';
import styles from './PokemonDetail.module.css';

import useHttpRequest from '../../../hooks/useHttpRequest';
import { useHistory } from 'react-router-dom';

import BaseButton from '../../_elements/BaseButton';

const pokemonDetailPropTypes = {
  pokemonName: PropTypes.string,
  pokemonId: PropTypes.number,
  imagePath: PropTypes.string,
  pokemonDescription: PropTypes.string
}

const PokemonDetail = ({pokemonName, pokemonId, imagePath, pokemonDescription}) => {

  let urlPokemonDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const { response: pokemonData } = useHttpRequest(urlPokemonDetail);

  let history = useHistory();
  const goToPokemonDetail = () => history.push(`/selection/${pokemonName}`);

  return (
    <>
      <div className={styles['pokemon-container']}>
        <img className={styles['pokemon-image-container']} 
          src={pokemonData && pokemonData.sprites && pokemonData.sprites.front_default} alt=""/>

        <h1 className={styles['pokemon-title']}>{pokemonName}</h1>
        {pokemonData && <h1 className={styles['pokemon-id']}>{pokemonData.id}</h1>}

        <BaseButton label='Select' onClickHandler={goToPokemonDetail} uppercase/>

      </div>
    </>
  );
}

PokemonDetail.propTypes = pokemonDetailPropTypes;

export default React.memo(PokemonDetail);