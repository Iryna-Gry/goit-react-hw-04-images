import React, { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

const MODAL_ROOT = document.querySelector('#modal-root');

const Modal = ({ id, largeImageURL, onClose }) => {
  const modalRef = createRef();

  const handleKey = e => {
    if (e.code !== 'Escape') return;
    onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line
  }, []);

  const handleMouseClick = e => {
    if (e.target && modalRef.current !== e.target) return;
    onClose();
  };
  return createPortal(
    <div
      className={css.Overlay}
      ref={modalRef}
      onClick={handleMouseClick}
      role="presentation"
    >
      <div className={css.Modal}>
        <img src={largeImageURL} alt="img" id={id} className={css.Img} />
      </div>
    </div>,
    MODAL_ROOT
  );
};

export default Modal;

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
