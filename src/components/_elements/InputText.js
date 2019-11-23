import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputText.module.css';

const pokemonDetailPropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  currentValue: PropTypes.string,
  onChangeHandler: PropTypes.func,
}

const InputText = ({ className, placeholder, currentValue, onChangeHandler }) => {

  return (
    <>
      <input type="text" className={styles[className]}
        placeholder={placeholder}
        value={currentValue}
        onChange={onChangeHandler}></input>
    </>
  );
}

InputText.propTypes = pokemonDetailPropTypes;

export default InputText;