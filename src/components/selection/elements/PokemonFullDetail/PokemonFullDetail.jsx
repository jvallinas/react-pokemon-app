import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './PokemonFullDetail.module.css';

import StatDisplay from '../../../_common/StatDisplay/StatDisplay';
import DetailTag from '../../../_common/DetailTag/DetailTag';

const pokemonFullDetailPropTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const pokemonFullDetailDefaultProps = {
  children: <></>,
};

const PokemonFullDetail = ({
  name, children,
}) => {
  const pokemonDetail = useSelector(
    (state) => state.pokemonList.filter((pokemon) => pokemon.name === name)[0],
  );

  const pokemonWeaknesses = useSelector(
    (state) => {
      const filterPokemonTypes = (type) => (
        type.name === pokemonDetail.type1 || type.name === pokemonDetail.type2
      );
      const typesForPokemon = state.weaknessesForType.filter(filterPokemonTypes);
      const weaknessesForPokemon = [].concat(...typesForPokemon.map((type) => [...type.weakTo]));
      return [...new Set(weaknessesForPokemon)];
    },
  );

  return (
    <>
      {pokemonDetail
      && (
      <>
        <h1 className={styles['pokemon-title']}>{name}</h1>
        <h2 className={styles['pokemon-id']}>{pokemonDetail.id}</h2>

        <div className={styles['pokemon-description']}>{pokemonDetail.description}</div>

        <div className={styles['details-container']}>

          <div className={styles['info-container']}>
            <div className={styles['stats-section']}>
              <StatDisplay statLabel="Height" statValue={pokemonDetail.height} />
              <StatDisplay statLabel="Weight" statValue={pokemonDetail.weight} />
              <StatDisplay statLabel="Category" statValue={[pokemonDetail.type1, pokemonDetail.type2]} />
              <StatDisplay statLabel="Abilities" statValue={pokemonDetail.abilities} />
            </div>

            <div className={styles['extra-info']}>
              <div className={styles['extra-info-section']}>TYPE</div>
              <div className={styles['extra-info-section']}>
                <DetailTag tagName={pokemonDetail.type1} />
                {pokemonDetail.type2 && <DetailTag tagName={pokemonDetail.type2} />}
              </div>
            </div>

            <div className={styles['extra-info']}>
              <div className={styles['extra-info-section']}>WEAKNESSES</div>
              <div className={styles['extra-info-section']}>
                {pokemonWeaknesses.map((weak) => <DetailTag key={weak} tagName={weak} />)}
              </div>
            </div>

          </div>

          <div className={styles['pokemon-container']}>
            <img
              className={styles['pokemon-image-container']}
              src={pokemonDetail && pokemonDetail.image}
              alt=""
            />
            {/* Slot for pokemon selection element */}
            {children}
          </div>
        </div>
      </>
      )}
    </>
  );
};

PokemonFullDetail.propTypes = pokemonFullDetailPropTypes;
PokemonFullDetail.defaultProps = pokemonFullDetailDefaultProps;

export default PokemonFullDetail;
