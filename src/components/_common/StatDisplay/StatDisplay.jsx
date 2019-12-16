import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatDisplay.module.css';

const statDisplayPropTypes = {
  statLabel: PropTypes.string.isRequired,
  statValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

const StatDisplay = ({
  statLabel, statValue,
}) => (
  <>
    <div className={styles['stat-container']}>
      <div className={styles['stat-label']}>
        {statLabel}
      </div>
      <div className={styles['stat-value']}>
        {typeof statValue === 'object'
          ? statValue.map(
            (value) => <div key={value}>{value}</div>,
          )
          : <div>{statValue}</div>}
      </div>
    </div>
  </>
);

StatDisplay.propTypes = statDisplayPropTypes;

export default React.memo(StatDisplay);
