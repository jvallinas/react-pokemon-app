import React from 'react';
import PropTypes from 'prop-types';
import styles from './PokemonDetail.module.css';

import useHttpRequest from '../../../hooks/useHttpRequest';

const pokemonDetailPropTypes = {
  pokemonName: PropTypes.string,
  pokemonId: PropTypes.number,
  imagePath: PropTypes.string,
}

function PokemonDetail(props) {

  let urlPokemonDetail = `https://pokeapi.co/api/v2/pokemon/${props.pokemonName}`;
  const { response: pokemonData } = useHttpRequest(urlPokemonDetail);

  return (
    <>
      <div className={styles['pokemon-container']}>
        <img className={styles['pokemon-image-container']} 
          src={pokemonData && pokemonData.sprites && pokemonData.sprites.front_default} alt=""/>

        <h1 className={styles['pokemon-title']}>{props.pokemonName}</h1>
        {pokemonData && <h1 className={styles['pokemon-id']}>{pokemonData.id}</h1>}
      </div>
    </>
  );
}

PokemonDetail.propTypes = pokemonDetailPropTypes;

export default PokemonDetail;