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
        <div className={styles['pokemons-container']}>
          <PokemonAvatar
            pokemonName={firstPokemon && firstPokemon.name}
            imagePath={firstPokemon && firstPokemon.image}
          />

          <div className={styles['vs-label']}>VS</div>

          <PokemonAvatar
            pokemonName={secondPokemon && secondPokemon.name}
            imagePath={secondPokemon && secondPokemon.image}
          />
          {firstPokemon && secondPokemon
            && (
              <BaseButton
                label="Fight!"
                onClickHandler={goToFightScreen}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default React.memo(BattleGround);
