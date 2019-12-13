import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import styles from './PokemonFullDetail.module.css';

import BaseButton from '../../_elements/BaseButton';

const pokemonFullDetailPropTypes = {
  name: PropTypes.string.isRequired,
};

const PokemonFullDetail = ({
  name,
}) => {
  const pokemonDetail = useSelector(
    (state) => state.pokemonList.filter((pokemon) => pokemon.name === name)[0],
  );

  return (
    <>
      {pokemonDetail
      && (
      <>
        <h1 className={styles['pokemon-title']}>{name}</h1>
        <h2 className={styles['pokemon-id']}>{pokemonDetail.id}</h2>

        <div className={styles['pokemon-description']}>{pokemonDetail.description}</div>

        <div className={styles['info-container']}>

          <div className={styles['stats-section']}>

            <div className={styles['stat-container']}>
              <div className={styles['stat-label']}>
                Height
              </div>
              <div className={styles['stat-value']}>
                {pokemonDetail.height}
              </div>
            </div>

            <div className={styles['stat-container']}>
              <div className={styles['stat-label']}>
                Weight
              </div>
              <div className={styles['stat-value']}>
                {pokemonDetail.weight}
              </div>
            </div>

            <div className={styles['stat-container']}>
              <div className={styles['stat-label']}>
                Category
              </div>
              <div className={styles['stat-value']}>
                {pokemonDetail.type1}
              </div>
            </div>

            <div className={styles['stat-container']}>
              <div className={styles['stat-label']}>
                Abilities
              </div>
              <div className={styles['stat-value']}>
                {pokemonDetail.abilities && pokemonDetail.abilities.map(
                  (ab) => <div key={ab}>{ab}</div>,
                )}
              </div>
            </div>
          </div>

          <div className={styles['pokemon-container']}>
            <img
              className={styles['pokemon-image-container']}
              src={pokemonDetail && pokemonDetail.image}
              alt=""
            />
            <BaseButton label="Select for battle" styleOptions={['uppercase']} />

          </div>
        </div>
      </>
      )}
    </>
  );
};

PokemonFullDetail.propTypes = pokemonFullDetailPropTypes;

export default PokemonFullDetail;
