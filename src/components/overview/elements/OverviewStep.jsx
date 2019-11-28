import React from 'react';
import PropTypes from 'prop-types';
import styles from './OverviewStep.module.css';

const overviewStepPropTypes = {
  imagePath: PropTypes.string.isRequired,
  stepTitle: PropTypes.string.isRequired,
  stepDescription: PropTypes.string.isRequired,
};

const OverviewStep = ({ imagePath, stepTitle, stepDescription }) => (
  <>
    <div className={styles['step-container']}>
      <img className={styles['step-image-container']} src={imagePath} alt="" />
      <h1 className={styles['step-title']}>{stepTitle}</h1>
      <div className={styles['step-description']}>{stepDescription}</div>
    </div>
  </>
);

OverviewStep.propTypes = overviewStepPropTypes;

export default OverviewStep;
