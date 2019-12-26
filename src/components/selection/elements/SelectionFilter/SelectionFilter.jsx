import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import InputText from '../../../_common/InputText/InputText';
import styles from './SelectionFilter.module.css';

import useDebounceInput from '../../../../hooks/useDebounceInput';

const selectionFilterPropTypes = {
  availableTypes: PropTypes.arrayOf(PropTypes.string),
  updateSelectedTypeHandler: PropTypes.func.isRequired,
  onDebouncedSearchUpdate: PropTypes.func,
  debounceInputTimeMs: PropTypes.number,
};

const selectionFilterDefaultProps = {
  availableTypes: [],
  onDebouncedSearchUpdate: (value) => value,
  debounceInputTimeMs: 500,
};

const SelectionFilter = ({
  availableTypes, updateSelectedTypeHandler, onDebouncedSearchUpdate, debounceInputTimeMs,
}) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const debouncedCurrentSearch = useDebounceInput(currentSearch, debounceInputTimeMs);

  const updateSearchTermHandler = useCallback((e) => {
    setCurrentSearch(e.target.value);
  }, []);

  useEffect(
    () => {
      // Executes callback whenever debounced input is changed
      onDebouncedSearchUpdate(debouncedCurrentSearch);
    }, [debouncedCurrentSearch, onDebouncedSearchUpdate],
  );

  return (
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
};

SelectionFilter.defaultProps = selectionFilterDefaultProps;
SelectionFilter.propTypes = selectionFilterPropTypes;

export default React.memo(SelectionFilter);
