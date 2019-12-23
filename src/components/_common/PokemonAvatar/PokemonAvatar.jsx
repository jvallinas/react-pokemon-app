import React from 'react';
import PropTypes from 'prop-types';

import styles from './PokemonAvatar.module.css';

const pokemonAvatarPropTypes = {
  imagePath: PropTypes.string,
  pokemonName: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

const pokemonAvatarDefaultProps = {
  pokemonName: '???',
  imagePath: '../images/pokeball.png',
  width: '50',
  height: '50',
};

const PokemonAvatar = ({
  pokemonName, imagePath, height, width,
}) => (
  <>
    <div className={styles['pokemon-container']}>
      <img
        className={styles['pokemon-image-container']}
        src={imagePath || ''}
        alt=""
        height={height}
        width={width}
      />

      {pokemonName && <div className={styles['pokemon-title']}>{pokemonName}</div>}

    </div>
  </>
);

PokemonAvatar.defaultProps = pokemonAvatarDefaultProps;
PokemonAvatar.propTypes = pokemonAvatarPropTypes;

export default React.memo(PokemonAvatar);
