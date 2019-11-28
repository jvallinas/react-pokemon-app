import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputText.module.css';

const pokemonDetailPropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  currentValue: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

const InputText = ({
  className, placeholder, currentValue, onChangeHandler,
}) => (
  <>
    <input
      type="text"
      className={styles[className]}
      placeholder={placeholder}
      value={currentValue}
      onChange={onChangeHandler}
    />
  </>
);

InputText.defaultProps = {
  className: '',
  placeholder: '...',
};

InputText.propTypes = pokemonDetailPropTypes;

export default React.memo(InputText);
