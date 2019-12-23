import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../../_common/InputText/InputText';
import styles from './SelectionFilter.module.css';

const selectionFilterPropTypes = {
  currentSearch: PropTypes.string.isRequired,
  updateSearchTermHandler: PropTypes.func.isRequired,
  availableTypes: PropTypes.arrayOf(PropTypes.string),
  updateSelectedTypeHandler: PropTypes.func.isRequired,
};

const selectionFilterDefaultProps = {
  availableTypes: [],
};

const SelectionFilter = ({
  currentSearch, updateSearchTermHandler, availableTypes, updateSelectedTypeHandler,
}) => (
  <div className={styles['filter-container']}>
    <div className={styles.search}>SEARCH</div>
    <InputText
      className="selection-filter"
      placeholder="Search by name..."
      currentValue={currentSearch}
      onChangeHandler={updateSearchTermHandler}
    />

    <select
      className={styles.type}
      defaultValue="none"
      onChange={updateSelectedTypeHandler}
    >
      <option value="none">Select a Pokemon type</option>
      {availableTypes.map((type) => (
        <option key={type} value={type} onChange={updateSelectedTypeHandler}>{type}</option>
      ))}
    </select>
  </div>
);

SelectionFilter.defaultProps = selectionFilterDefaultProps;
SelectionFilter.propTypes = selectionFilterPropTypes;

export default React.memo(SelectionFilter);
