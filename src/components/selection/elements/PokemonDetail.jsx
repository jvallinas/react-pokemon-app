import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './PokemonDetail.module.css';

import useHttpRequest from '../../../hooks/useHttpRequest';
import BaseButton from '../../_elements/BaseButton';

const pokemonDetailPropTypes = {
  pokemonName: PropTypes.string.isRequired,
  pokemonId: PropTypes.string,
  imagePath: PropTypes.string,
  pokemonDescription: PropTypes.string,
};

const pokemonDetailDefaultProps = {
  pokemonId: '',
  imagePath: '',
  pokemonDescription: '',
};

const PokemonDetail = ({
  pokemonName, pokemonId, imagePath, pokemonDescription,
}) => {
  const urlPokemonDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const { response: pokemonData } = useHttpRequest(urlPokemonDetail);

  const history = useHistory();
  const goToPokemonDetail = () => history.push(`/selection/${pokemonName}`);

  return (
    <>
      <div className={styles['pokemon-container']}>
        <img
          className={styles['pokemon-image-container']}
          src={pokemonData && pokemonData.sprites && pokemonData.sprites.front_default}
          alt=""
        />

        <h1 className={styles['pokemon-title']}>{pokemonName}</h1>

        {pokemonData && (
          <>
            <h1 className={styles['pokemon-id']}>{pokemonData.id}</h1>
            <BaseButton label="Select" onClickHandler={goToPokemonDetail} styleOptions={['uppercase']} />
          </>
        )}

      </div>
    </>
  );
};

PokemonDetail.defaultProps = pokemonDetailDefaultProps;
PokemonDetail.propTypes = pokemonDetailPropTypes;

export default React.memo(PokemonDetail);
