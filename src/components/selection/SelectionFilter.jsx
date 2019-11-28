import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../_elements/InputText';
import styles from './SelectionFilter.module.css';

const selectionFilterPropTypes = {
  currentSearch: PropTypes.string.isRequired,
  updateSearchTermHandler: PropTypes.func.isRequired,
};

const SelectionFilter = ({ currentSearch, updateSearchTermHandler }) => (
  <div className={styles['filter-container']}>
    <div className={styles.search}>SEARCH</div>
    <InputText
      className="selection-filter"
      placeholder="Search by name..."
      currentValue={currentSearch}
      onChangeHandler={updateSearchTermHandler}
    />
  </div>
);

SelectionFilter.propTypes = selectionFilterPropTypes;

export default SelectionFilter;
