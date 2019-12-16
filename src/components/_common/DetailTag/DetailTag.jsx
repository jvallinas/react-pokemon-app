import React from 'react';
import PropTypes from 'prop-types';
import styles from './DetailTag.module.css';

const detailTagPropTypes = {
  tagName: PropTypes.string,
};

const DetailTag = ({
  tagName,
}) => (
  <>
    <span className={[styles.tag, styles[tagName]].join(' ')}>{tagName}</span>
  </>
);

DetailTag.defaultProps = {
  tagName: '',
};

DetailTag.propTypes = detailTagPropTypes;

export default React.memo(DetailTag);
