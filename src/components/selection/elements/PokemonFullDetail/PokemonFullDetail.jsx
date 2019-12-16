import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ACTIONS from '../../../../containers/App/actions/actions';

import styles from './PokemonFullDetail.module.css';

import BaseButton from '../../../_common/BaseButton/BaseButton';
import StatDisplay from '../../../_common/StatDisplay/StatDisplay';
import DetailTag from '../../../_common/DetailTag/DetailTag';

const pokemonFullDetailPropTypes = {
  name: PropTypes.string.isRequired,
};

const PokemonFullDetail = ({
  name,
}) => {
  const dispatch = useDispatch();

  /* EVENT HANDLERS */
  const selectPokemonHandler = useCallback(() => {
    dispatch(ACTIONS.setPokemonForBattle(name));
  }, [name, dispatch]);

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

          </div>

          <div className={styles['pokemon-container']}>
            <img
              className={styles['pokemon-image-container']}
              src={pokemonDetail && pokemonDetail.image}
              alt=""
            />
            <BaseButton label="Select for battle" styleOptions={['uppercase']} onClickHandler={selectPokemonHandler} />
          </div>
        </div>
      </>
      )}
    </>
  );
};

PokemonFullDetail.propTypes = pokemonFullDetailPropTypes;

export default PokemonFullDetail;
