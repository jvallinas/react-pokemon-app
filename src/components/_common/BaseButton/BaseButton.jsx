import React from 'react';
import PropTypes from 'prop-types';
import styles from './BaseButton.module.css';

const baseButtonPropTypes = {
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  styleOptions: PropTypes.arrayOf(PropTypes.string),
};

const BaseButton = React.forwardRef(({ label, onClickHandler, styleOptions }, ref) => {
  const mappedStyleClasses = styleOptions.map((option) => styles[option]).join(' ');
  return (
    <>
      <button
        type="button"
        className={mappedStyleClasses}
        onClick={onClickHandler}
        ref={ref}
      >
        {label}
      </button>
    </>
  );
});

BaseButton.defaultProps = {
  styleOptions: [''],
};
BaseButton.propTypes = baseButtonPropTypes;

export default React.memo(BaseButton);
