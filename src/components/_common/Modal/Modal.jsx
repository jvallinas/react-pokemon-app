import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalPropTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  modalCloseHandler: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

// TODO improve accessibility features or find a modal library
const Modal = ({ modalCloseHandler, show, children }) => {
  const modalStatusClass = show ? 'modal-visible' : 'modal-hidden';

  const handleKeyboardInteraction = useCallback((e) => {
    switch (e.keyCode) {
      case 27: // ESC key
        modalCloseHandler();
        break;
      default:
        break;
    }
  }, [modalCloseHandler]);

  return (
    /* The <div> element has a child <button> element that allows keyboard interaction */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div className={styles[modalStatusClass]} onKeyDown={handleKeyboardInteraction}>
      <section className={styles['modal-frame']}>
        <button
          type="button"
          className={styles.close}
          onClick={modalCloseHandler}
        >
          Close
        </button>
        {/* Slot for content to display in modal */}
        {children}
      </section>
    </div>
  );
};

Modal.defaultProps = { show: false };
Modal.propTypes = modalPropTypes;

export default Modal;
