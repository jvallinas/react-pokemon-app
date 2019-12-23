import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './BattleGround.module.css';


import PokemonAvatar from '../../../_common/PokemonAvatar/PokemonAvatar';
import BaseButton from '../../../_common/BaseButton/BaseButton';

const BattleGround = () => {
  const firstPokemon = useSelector((state) => {
    if (!state.pokemonBattleground) return null;
    return state.pokemonBattleground[0];
  });

  const secondPokemon = useSelector((state) => {
    if (!state.pokemonBattleground) return null;
    return state.pokemonBattleground[1];
  });

  const historyHandler = useHistory();

  /* EVENT HANDLERS */
  const goToFightScreen = useCallback(() => historyHandler.push('fight'), [historyHandler]);

  return (
    <>
      <div className={styles['battleground-container']}>

        <div className={styles['pokemon-container']}>
          <PokemonAvatar
            imagePath={firstPokemon && firstPokemon.image}
          />
          {firstPokemon
            && <button type="button" className={styles['button-badge']}>X</button>}
        </div>

          <div className={styles['vs-label']}>VS</div>

        <div className={styles['pokemon-container']}>
          <PokemonAvatar
            pokemonName={secondPokemon && secondPokemon.name}
            imagePath={secondPokemon && secondPokemon.image}
          />
          {secondPokemon
            && <button type="button" className={styles['button-badge']}>X</button>}
        </div>

          {firstPokemon && secondPokemon
            && (
              <BaseButton
                label="Fight!"
                onClickHandler={goToFightScreen}
              />
            )}
        </div>
    </>
  );
};

export default React.memo(BattleGround);
