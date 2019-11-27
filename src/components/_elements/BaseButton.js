import React from 'react';
import PropTypes from 'prop-types';
import styles from './BaseButton.module.css';

const baseButtonPropTypes = {
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,

  // Style props
  uppercase: PropTypes.bool,
  purple: PropTypes.bool
}

const BaseButton = ({ label, onClickHandler, ...styleProps }) => {
  
  const stylesList = styleProps && Object.keys(styleProps).map(c => styles[c]).join(' ');
  return (
    <>
      <button 
        className={stylesList}
        onClick={onClickHandler} 
      >{label}</button>
    </>
  );
}

BaseButton.propTypes = baseButtonPropTypes;

export default React.memo(BaseButton);