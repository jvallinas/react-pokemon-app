import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalPropTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onModalClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

// TODO improve accessibility features or find a modal library
const Modal = ({ onModalClose, show, children }) => {
  const modalStatusClass = show ? 'modal-visible' : 'modal-hidden';

  const exitButtonElement = useRef(null);

  // Places focus on exit button when modal component is rendered
  useEffect(() => {
    exitButtonElement.current.focus();
  }, []);

  return (
    <div className={styles[modalStatusClass]}>
      <section className={styles['modal-frame']}>
        <button
          type="button"
          className={styles.close}
          onClick={onModalClose}
          ref={exitButtonElement}
        >
          Close
        </button>
        {children}
      </section>
    </div>
  );
};

Modal.defaultProps = { show: false };
Modal.propTypes = modalPropTypes;

export default Modal;
